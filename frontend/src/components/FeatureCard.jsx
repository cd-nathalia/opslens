function FeatureCard({ number, icon, title, text }) {
  return <article className="feature"><div className="feature-icon">{icon}</div><span className="feature-number">{number}</span><h2>{title}</h2><p>{text}</p></article>;
}

export default FeatureCard;
