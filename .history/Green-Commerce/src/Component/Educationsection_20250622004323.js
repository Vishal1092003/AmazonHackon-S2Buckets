import React, { useState } from "react";

// Data for each sustainability topic, drawing from 2023 report
const sections = [
  { key: 'carbon', title: 'Carbon', desc: '3% absolute emissions reduction; 13% carbon intensity decrease; 473 Climate Pledge signatories', icon: '🟢' },
  { key: 'carbonFreeEnergy', title: 'Carbon‑Free Energy', desc: '100% renewables matched; world’s largest corporate purchaser of renewable energy', icon: '⚡' },
  { key: 'packaging', title: 'Packaging', desc: '90% of new devices in 100% recyclable packaging; 9% plastic packaging weight reduction', icon: '📦' },
  { key: 'wasteCircularity', title: 'Waste & Circularity', desc: '75% reduction in food waste intensity (EU); 28% (US); 82M meals donated', icon: '♻️' },
  { key: 'water', title: 'Water', desc: '41% progress toward AWS water positive; returning more water than used', icon: '💧' },
  { key: 'valueChain', title: 'Value Chain', desc: 'Supplier decarbonization initiatives; public Sustainable Supply Chain Exchange', icon: '🔗' },
  { key: 'humanRights', title: 'Human Rights', desc: '3K+ supplier assessments on social & environmental metrics', icon: '⚖️' },
  { key: 'supplyChain', title: 'Responsible Supply Chain', desc: '>$1.3B invested in diverse suppliers; $4.3B with US Tier‑1 diverse', icon: '🚚' },
  { key: 'productsMaterials', title: 'Sustainable Products & Materials', desc: '1.16B Climate Pledge Friendly items sold; 16K homes supported', icon: '🌱' },
  { key: 'communityImpact', title: 'Community Impact', desc: '32M+ AWS credits for health equity; 76K employees volunteered', icon: '🏘️' },
  { key: 'employees', title: 'Employees', desc: '358K employees upskilled; 100K+ veterans & spouses hired', icon: '👥' },
  { key: 'healthSafety', title: 'Health & Safety', desc: '30% reduction in recordable incident rate vs 2019', icon: '🛡️' }
];

export default function EducationSection() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const toggleFAQ = idx => setActiveFAQ(activeFAQ === idx ? null : idx);

  // Inline styles
  const container = { padding: '24px', backgroundColor: '#f5fbf9', fontFamily: 'Arial, sans-serif' };

  const navStyle = { display: 'flex', gap: '16px', marginBottom: '32px' };
  const navLink = { color: '#006d5a', textDecoration: 'none', fontWeight: 600, padding: '8px 12px', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' };

  const heroGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '48px'
  };
  const heroCard = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };
  const heroIcon = { fontSize: '1.8rem', marginBottom: '8px' };
  const heroTitle = { fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#01332b' };
  const heroDesc = { fontSize: '0.85rem', color: '#01332b', lineHeight: 1.4 };

  const faqSection = { marginTop: '32px' };
  const faqTitle = { fontSize: '1.8rem', marginBottom: '16px', color: '#01332b' };
  const faqItem = { marginBottom: '12px' };
  const faqBtn = open => ({
    width: '100%', padding: '16px', textAlign: 'left', fontSize: '1rem',
    background: open ? '#e3f7f0' : '#fff', border: '1px solid #d0e3de', borderRadius: '8px',
    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  });
  const faqAnswer = { padding: '16px', background: '#fafafa', border: '1px solid #d0e3de', borderTop: 'none', borderRadius: '0 0 8px 8px', fontSize: '0.95rem', lineHeight: 1.5 };

  return (
    <div style={container}>
      {/* Top Nav */}
      <nav style={navStyle}>
        <a href="/" style={navLink}>Home</a>
        <a href="#EcoCertification" style={navLink}>Certificates</a>
        <a href="#FAQ" style={navLink}>FAQs</a>
      </nav>

      {/* Carbon Section */}
      <section style={{ ...hero, backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '48px' }}>
        <div style={{ ...textBlock, paddingRight: '24px' }}>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '16px', color: '#01332b' }}>Carbon Emission</h1>
          <p style={{ lineHeight: 1.6, color: '#01332b' }}>
            The science is clear. Significant carbon emission reductions are required to avoid the most severe effects
            of climate change, restore biodiversity, protect vulnerable communities, and ensure a habitable planet for future generations. Amazon has an incredibly ambitious goal to achieve net‑zero carbon across our operations by 2040. We’ll do this by implementing decarbonization strategies through real business changes and innovations, and neutralizing any remaining emissions with additional, quantifiable, real, permanent, and socially beneficial offsets to achieve net‑zero annual carbon emissions by 2040.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img src="/images/carbon_graph.png" alt="Carbon Reduction Graph" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
      </section>

      {/* Carbon-Free Energy Section */}
      <section style={{ ...hero, backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '48px', flexDirection: 'row-reverse' }}>
        <div style={{ flex: 1 }}>
          <img src="/images/renewable_energy_graph.png" alt="Renewable Energy Progress" style={{ width: '100%', borderRadius: '12px' }} />
        </div>
        <div style={{ ...textBlock, paddingLeft: '24px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#01332b' }}>Carbon‑Free Energy</h2>
          <p style={{ lineHeight: 1.6, color: '#01332b' }}>
            Transitioning to carbon‑free energy sources—which include renewable energy sources such as wind and solar as well as other sources such as nuclear power—is one of the most effective ways to lower Scope 2 emissions. By scaling carbon‑free energy, we aim to make Amazon a more resilient and more sustainable business, drive a global transition to cleaner energy, and achieve our commitment to The Climate Pledge to reach net‑zero carbon emissions by 2040.
          </p>
          <p style={{ marginTop: '16px', color: '#01332b', fontWeight: 600 }}>
            In 2023, we reached this milestone seven years early, matching 100% of our electricity consumption with renewable energy.
          </p>
        </div>
      </section>
      <h2 style={faqTitle}>Frequently Asked Questions</h2>
      {sections.map((s, i) => (
        <div key={s.key} style={faqItem}>
          <button
            onClick={() => toggleFAQ(i)}
            style={faqBtn(activeFAQ === i)}
          >
            <span>{s.title}</span>
            <span>{activeFAQ === i ? '−' : '+'}</span>
          </button>
          {activeFAQ === i && (
            <div style={faqAnswer}>
              {s.desc} {/* Detailed text from 2023 report can go here */}
            </div>
          )}
        </div>
      ))}
    </section>
    </div >
  );
}
