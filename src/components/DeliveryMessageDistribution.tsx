const messages = [
  ["Urge delivery", 40],
  ["Change the delivery location", 26],
  ["Make changes to notes", 16],
  ["Thanks message", 8],
  ["Ask for drop off", 2],
  ["Change phone number", 1.8],
  ["False delivery", 1.4],
  ["Comfort delivery man", 1.2],
  ["Ask delivery man’s location", 0.8],
  ["Ask for receipt", 0.2],
] as const;

export default function DeliveryMessageDistribution() {
  return <svg className="delivery-message-distribution" viewBox="0 0 640 410" role="img" aria-labelledby="delivery-distribution-title">
    <title id="delivery-distribution-title">IM message distribution: urge delivery 40%, change the delivery location 26%, make changes to notes 16%, thanks message 8%, ask for drop off 2%, change phone number 1.8%, false delivery 1.4%, comfort delivery man 1.2%, ask delivery man’s location 0.8%, ask for receipt 0.2%.</title>
    {messages.map(([label, value], index) => {
      const y = 25 + index * 40;
      const width = 20 + value * 8;
      return <g key={label} className={index === 0 ? "distribution-primary" : undefined}>
        <text x="208" y={y} textAnchor="end" dominantBaseline="middle">{label}</text>
        <rect x="228" y={y - 9} width={width} height="18" rx="9" />
        <text x={228 + width + 12} y={y} dominantBaseline="middle">{value}%</text>
      </g>;
    })}
  </svg>;
}