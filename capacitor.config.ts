import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.socialninjas.fitninja',
  appName: 'Fit Ninja',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Custom native bridge for ActivityKit / Dynamic Island
    FitNinjaLiveActivity: {}
  }
};

export default config;
