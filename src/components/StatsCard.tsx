/**
 * Function to render a Value Card
 * @param title title for the card
 * @param value the value to showcase in the card
 */
export function StatsCard(title: string, value: string | number) {

    return (
        <div className="card text-center">
            <div className="card-header">
                <h5>
                    {title}
                </h5>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    {value}
                </h5>
            </div>
        </div>
    )
}