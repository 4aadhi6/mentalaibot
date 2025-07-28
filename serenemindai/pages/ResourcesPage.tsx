
import React from 'react';

interface ResourceCardProps {
    title: string;
    description: string;
    link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link }) => (
    <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg p-6 flex flex-col">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="flex-grow text-light-subtle dark:text-dark-subtle mb-4">{description}</p>
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="self-start font-semibold text-secondary hover:underline"
        >
            Learn More &rarr;
        </a>
    </div>
);

const ResourcesPage: React.FC = () => {
    const resources = [
        {
            title: "Guided Meditation",
            description: "Find calm and focus with guided audio meditations for stress, anxiety, and sleep.",
            link: "https://www.mindful.org/meditation/guided-meditation/"
        },
        {
            title: "Breathing Exercises",
            description: "Learn simple breathing techniques like box breathing to quickly reduce stress and anxiety.",
            link: "https://www.healthline.com/health/breathing-exercises-for-anxiety"
        },
        {
            title: "Understanding CBT",
            description: "Cognitive Behavioral Therapy (CBT) is a powerful tool for changing negative thought patterns. Learn the basics.",
            link: "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral"
        },
        {
            title: "Crisis Support",
            description: "If you are in immediate distress, please reach out. You are not alone. The 988 Lifeline is available 24/7.",
            link: "https://988lifeline.org/"
        },
        {
            title: "NAMI",
            description: "The National Alliance on Mental Illness provides advocacy, education, support and public awareness.",
            link: "https://www.nami.org/"
        },
        {
            title: "Mental Health America",
            description: "MHA is the nation’s leading community-based nonprofit dedicated to addressing the needs of those living with mental illness.",
            link: "https://www.mhanational.org/"
        }
    ];

    return (
        <div className="animate-fade-in-up">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Helpful Resources</h1>
                <p className="text-lg text-light-subtle dark:text-dark-subtle max-w-2xl mx-auto">
                    Here are some tools and information to support you on your mental wellness journey.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((res, index) => (
                    <ResourceCard key={index} title={res.title} description={res.description} link={res.link} />
                ))}
            </div>
             <div className="mt-12 p-6 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg">
                <h3 className="font-bold text-red-800 dark:text-red-200">Important Disclaimer</h3>
                <p className="text-red-700 dark:text-red-300 mt-1">
                    SereneMind AI is a supportive tool, not a replacement for professional medical advice, diagnosis, or treatment. If you are in crisis or believe you may have a medical emergency, call your doctor or 911 immediately.
                </p>
            </div>
        </div>
    );
};

export default ResourcesPage;
