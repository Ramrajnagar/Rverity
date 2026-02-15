import Section from "@/components/ui/Section";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            <Section className="pt-32 pb-20 relative z-10 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using Rverity, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h2>2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Rverity's website for personal, non-commercial transitory viewing only.</p>

                    <h2>3. Disclaimer</h2>
                    <p>The materials on Rverity's website are provided "as is". Rverity makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>

                    <h2>4. Limitations</h2>
                    <p>In no event shall Rverity or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rverity's Internet site.</p>
                </div>
            </Section>
        </main>
    )
}
