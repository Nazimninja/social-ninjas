import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
    {
        id: 1,
        client: "TechStart Inc",
        logo: "https://placehold.co/200x60/020617/ffffff?text=TechStart",
        category: "B2B Lead Gen",
        mainMetric: "+120%",
        metricLabel: "Qualified Leads",
        secondaryMetrics: [
            { label: "Cost Per Lead", value: "-40%" },
            { label: "Conv. Rate", value: "+25%" }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        challenge: "TechStart Inc. faced a critical bottleneck in their B2B lead generation pipeline. Despite significant investment in LinkedIn marketing, their efforts were yielding a prohibitively high Cost Per Lead (CPL) exceeding $150. Furthermore, the leads that were coming through had low intent scores, resulting in a wasted effort for the sales team and a low conversion rate down the funnel.",
        solution: "We engineered a precision-targeted Account-Based Marketing (ABM) strategy to reverse this trend. By identifying the top 500 ideal customer profiles, we deployed high-value lead magnets specifically tailored to C-suite pain points. We coupled this with a retargeting layer that nurtured prospects with case studies, resulting in higher intent before they even booked a demo.",
        tags: ["LinkedIn Ads", "Strategy", "Copywriting"],
        testimonial: {
            text: "We were burning cash on LinkedIn with zero ROI. The team came in, completely restructured our funnel, and now our calendar is full of qualified demos. Our CPL dropped by 40% in the first month.",
            author: "Mark S.",
            role: "VP of Sales",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        }
    },
    {
        id: 2,
        client: "FashionNova Style",
        logo: "https://placehold.co/200x60/020617/ffffff?text=FashionNova",
        category: "E-Commerce",
        mainMetric: "5.2x",
        metricLabel: "ROAS",
        secondaryMetrics: [
            { label: "Revenue", value: "$250k" },
            { label: "CPA Redux", value: "15%" }
        ],
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
        challenge: "As a fast-growing e-commerce brand, FashionNova Style hit a plateau. They needed to aggressively scale their monthly ad spend from $10k to $50k to meet revenue targets. However, previous attempts to scale resulted in diminishing returns, with CPA skyrocketing and ROAS dropping below the profitable threshold of 3.0x.",
        solution: "We deployed our proprietary 'Creative Testing Framework' to unlock scale. By launching 20+ unique User Generated Content (UGC) variations weekly, we were able to combat ad fatigue effectively. We tested these creatives against broad and lookalike audiences, rapidly allocating budget to the winning variations to maintain efficiency at higher spend levels.",
        tags: ["Meta Ads", "UGC", "Scaling"],
        testimonial: {
            text: "I was terrified to scale spend because our ROAS always crashed. Social Ninja's didn't just maintain efficiency; they improved it while 5x-ing our budget. They are true growth partners.",
            author: "Sarah J.",
            role: "Founder",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        }
    },
    {
        id: 3,
        client: "Urban Eats",
        logo: "https://placehold.co/200x60/020617/ffffff?text=Urban+Eats",
        category: "Local Business",
        mainMetric: "2M+",
        metricLabel: "Organic Views",
        secondaryMetrics: [
            { label: "Foot Traffic", value: "+45%" },
            { label: "New Followers", value: "15k" }
        ],
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
        challenge: "Urban Eats was launching a flagship location in a hyper-competitive downtown district. With established competitors dominating the market and a limited launch budget, they needed to generate massive local awareness and foot traffic immediately upon opening to ensure the location's viability.",
        solution: "We bypassed traditional PR and focused on a viral social strategy. We produced a cinematic 'Hidden Gem' Reels series and collaborated with 15 key local food influencers. This content flood triggered the Instagram algorithm, landing the brand on the Explore page for local users and creating a 'must-visit' hype that led to lines around the block.",
        tags: ["Content Creation", "Influencer", "Reels"],
        testimonial: {
            text: "We had a line around the block on opening day purely because of the social campaign. The 'Hidden Gem' series they produced went viral instantly. Best launch investment we ever made.",
            author: "David R.",
            role: "Owner",
            image: "https://randomuser.me/api/portraits/men/86.jpg"
        }
    },
    {
        id: 4,
        client: "FitLife App",
        logo: "https://placehold.co/200x60/020617/ffffff?text=FitLife",
        category: "App Growth",
        mainMetric: "-40%",
        metricLabel: "CPI",
        secondaryMetrics: [
            { label: "Store Visits", value: "+200%" },
            { label: "LTV Increase", value: "3.5x" }
        ],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        challenge: "FitLife App was struggling with unsustainable unit economics. User acquisition costs (CAC) on Meta and Google were skyrocketing due to market saturation, severely impacting their LTV/CAC ratio. They needed a new, cost-effective channel to acquire high-quality users who would stick around.",
        solution: "We pivoted the acquisition strategy entirely to TikTok. By utilizing Spark Ads and partnering with fitness creators to demonstrate the app's utility in real-time, we created native, non-salesy content. This approach felt authentic to the platform, drastically lowering CPMs and attracting users with 3.5x higher retention rates.",
        tags: ["TikTok Ads", "App Store Opt", "Creators"],
        testimonial: {
            text: "Our CAC was killing us before we met this team. They understood that TikTok requires a completely different language. The native ads they produced felt like real content, and the results were immediate.",
            author: "Jessica M.",
            role: "CMO",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    }
];