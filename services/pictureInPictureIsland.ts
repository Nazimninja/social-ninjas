/**
 * Picture-in-Picture "Mini Island" Engine
 * 
 * Renders an ultra-premium, retina-resolution OLED Dynamic Island onto an
 * offscreen Canvas and streams it into native Picture-in-Picture.
 * 
 * This gives Android phones, standard iPhones, tablets, and laptops a true
 * floating Dynamic Island HUD that hovers over Spotify, WhatsApp, Instagram,
 * or the home screen while resting between sets.
 */

export interface PiPIslandState {
  isResting: boolean;
  remainingSeconds: number;
  totalSeconds: number;
  currentExercise: string;
  nextExercise: string;
  nextTarget: string;
  nextMuscle: string;
  workoutTitle: string;
  elapsedSeconds: number;
}

class PictureInPictureIsland {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private video: HTMLVideoElement | null = null;
  private animFrameId: number | null = null;
  private isPiPActive: boolean = false;
  private currentState: PiPIslandState = {
    isResting: false,
    remainingSeconds: 0,
    totalSeconds: 90,
    currentExercise: 'Fit Ninja',
    nextExercise: 'Get Ready',
    nextTarget: 'Prepare for next set',
    nextMuscle: 'Full Body',
    workoutTitle: 'Workout Protocol',
    elapsedSeconds: 0,
  };

  private initElements() {
    if (typeof window === 'undefined' || this.canvas) return;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.ctx = this.canvas.getContext('2d');

    this.video = document.createElement('video');
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.autoplay = true;

    // Listen to PiP exit
    this.video.addEventListener('leavepictureinpicture', () => {
      this.isPiPActive = false;
      this.stopRendering();
    });
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return (
      'pictureInPictureEnabled' in document &&
      document.pictureInPictureEnabled &&
      HTMLCanvasElement.prototype.captureStream !== undefined
    );
  }

  public get isActive(): boolean {
    return this.isPiPActive;
  }

  public updateState(state: Partial<PiPIslandState>) {
    this.currentState = { ...this.currentState, ...state };
    if (this.isPiPActive) {
      this.renderFrame();
    }
  }

  /**
   * Render luxury OLED Dynamic Island frame
   */
  private renderFrame() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.currentState;

    // 1. OLED Pitch Black Canvas
    ctx.fillStyle = '#06080e';
    ctx.fillRect(0, 0, w, h);

    // 2. Luxury Glass Card
    const pad = 16;
    const cardX = pad;
    const cardY = pad;
    const cardW = w - pad * 2;
    const cardH = h - pad * 2;
    const radius = 28;

    // Card background & glowing border
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fillStyle = '#0a0d17';
    ctx.fill();

    // Subtle blue edge glow
    ctx.lineWidth = 2;
    ctx.strokeStyle = s.isResting ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.4)';
    ctx.stroke();
    ctx.restore();

    // 3. Top Header: Fit Ninja + Status
    ctx.save();
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = s.isResting ? '#38bdf8' : '#34d399';
    const statusText = s.isResting ? '● REST INTERVAL' : '● ACTIVE WORKOUT';
    ctx.fillText(statusText, cardX + 24, cardY + 38);

    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.textAlign = 'right';
    ctx.fillText(s.workoutTitle.slice(0, 24), cardX + cardW - 24, cardY + 38);
    ctx.restore();

    // 4. Circular Progress Indicator (Left)
    const ringCx = cardX + 70;
    const ringCy = cardY + 115;
    const ringR = 48;

    const remaining = s.isResting ? s.remainingSeconds : s.elapsedSeconds;
    const total = s.isResting ? (s.totalSeconds || 1) : 3600;
    const pct = s.isResting ? Math.max(0, Math.min(1, remaining / total)) : 1;

    // Background track
    ctx.save();
    ctx.beginPath();
    ctx.arc(ringCx, ringCy, ringR, 0, Math.PI * 2);
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * pct);
    ctx.arc(ringCx, ringCy, ringR, startAngle, endAngle);
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.strokeStyle = s.isResting ? '#38bdf8' : '#34d399';
    ctx.shadowColor = s.isResting ? 'rgba(56, 189, 248, 0.6)' : 'rgba(52, 211, 153, 0.6)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();

    // Countdown digits inside ring
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px "SF Mono", Menlo, Consolas, monospace';
    ctx.fillStyle = '#ffffff';
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
    ctx.fillText(timeStr, ringCx, ringCy - 2);

    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(s.isResting ? 'REMAINING' : 'ELAPSED', ringCx, ringCy + 18);
    ctx.restore();

    // 5. Current Exercise & Set Stats (Right of Ring)
    ctx.save();
    ctx.textAlign = 'left';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('JUST FINISHED', ringCx + ringR + 24, cardY + 95);

    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    const exDisplay = s.currentExercise.length > 22 ? s.currentExercise.slice(0, 20) + '…' : s.currentExercise;
    ctx.fillText(exDisplay, ringCx + ringR + 24, cardY + 120);

    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.fillText(`Rest Target: ${s.totalSeconds}s`, ringCx + ringR + 24, cardY + 142);
    ctx.restore();

    // 6. UP NEXT Preview Box (Bottom half)
    const boxX = cardX + 20;
    const boxY = cardY + 180;
    const boxW = cardW - 40;
    const boxH = cardH - 195;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 18);
    ctx.fillStyle = 'rgba(31, 75, 153, 0.18)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.stroke();

    // "UP NEXT" label + Muscle Group badge
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('⚡ UP NEXT', boxX + 16, boxY + 26);

    if (s.nextMuscle) {
      ctx.textAlign = 'right';
      ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(s.nextMuscle.toUpperCase(), boxX + boxW - 16, boxY + 26);
      ctx.textAlign = 'left';
    }

    // Next Exercise Name
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    const nextName = s.nextExercise.length > 28 ? s.nextExercise.slice(0, 26) + '…' : s.nextExercise;
    ctx.fillText(nextName, boxX + 16, boxY + 58);

    // Target Reps & Weight
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.fillText(s.nextTarget, boxX + 16, boxY + 84);
    ctx.restore();
  }

  private startRendering() {
    this.renderFrame();
    const loop = () => {
      this.renderFrame();
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  private stopRendering() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  /**
   * Toggle Picture-in-Picture Mini Island
   */
  public async togglePiP(initialState?: Partial<PiPIslandState>): Promise<boolean> {
    if (initialState) {
      this.updateState(initialState);
    }

    this.initElements();
    if (!this.canvas || !this.video) return false;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        this.isPiPActive = false;
        this.stopRendering();
        return false;
      } else {
        this.renderFrame();
        const stream = this.canvas.captureStream(30);
        this.video.srcObject = stream;
        await this.video.play();
        await this.video.requestPictureInPicture();
        this.isPiPActive = true;
        this.startRendering();
        return true;
      }
    } catch (err) {
      console.warn('[FitNinja] Picture-in-Picture toggle failed:', err);
      return false;
    }
  }

  /**
   * Close PiP if currently open
   */
  public async closePiP() {
    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch {}
    }
    this.isPiPActive = false;
    this.stopRendering();
  }
}

export const pipIsland = new PictureInPictureIsland();
