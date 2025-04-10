import { Card, CardContent } from "@/components/ui/card"
export default function OurValues() {
    return (
        <section className="mb-16">

            <h2 className="text-4xl font-bold mb-8 text-center text-primary">Our Core Values</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-lg text-center">

                <Card className="p-6 shadow-sm bg-gradient-to-br from-blue-500 to-blue-800 dark:to-blue-950 text-white">
                    <CardContent className="p-0 flex flex-col items-center">
                        <span className="text-3xl mb-2 inline-block">✅</span>
                        <h4 className="font-semibold mb-1">Integrity</h4>
                        <p className="text-sm text-blue-100">Security without compromise.</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-sm bg-gradient-to-br from-violet-500 to-violet-800 dark:to-violet-950 text-white">
                    <CardContent className="p-0 flex flex-col items-center">
                        <span className="text-3xl mb-2 inline-block">🚀</span>
                        <h4 className="font-semibold mb-1">Innovation</h4>
                        <p className="text-sm text-violet-100">Always ahead of the curve.</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-sm bg-gradient-to-br from-cyan-500 to-cyan-800 dark:to-cyan-950 text-white">
                    <CardContent className="p-0 flex flex-col items-center">
                        <span className="text-3xl mb-2 inline-block">💡</span>
                        <h4 className="font-semibold mb-1">Empowerment</h4>
                        <p className="text-sm text-cyan-100">Putting control in your hands.</p>
                    </CardContent>
                </Card>
                <Card className="p-6 shadow-sm bg-gradient-to-br from-green-500 to-green-800 dark:to-green-950 text-white">
                    <CardContent className="p-0 flex flex-col items-center">
                        <span className="text-3xl mb-2 inline-block">🤝</span>
                        <h4 className="font-semibold mb-1">Trust</h4>
                        <p className="text-sm text-green-100">Built on transparency and results.</p>
                    </CardContent>
                </Card>
            </ul>
        </section>
    )
}