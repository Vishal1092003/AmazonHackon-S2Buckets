import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Navbar from './navbar';

export default function StandardDashboard() {
    const navigate = useNavigate();
    const [activeTile, setActiveTile] = useState(null);

    const container = { padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6' };
    const titleStyle = { fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#111827' };
    const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' };

    const baseCard = {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s'
    };
    const hoveredCard = { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
    const activeCardStyle = { backgroundColor: '#e6ffe6', transform: 'scale(1.02)' };

    const iconStyle = { width: '40px', height: '40px', marginRight: '16px', flexShrink: 0 };
    const cardTitle = { fontSize: '18px', fontWeight: '500', margin: 0, color: '#111827' };
    const cardDesc = { fontSize: '14px', margin: '4px 0 0', color: '#6b7280' };

    const tiles = [
        {
            icon: 'https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-3628-620a-8899-2594c86a8cc5/raw?se=2025-06-21T18%3A06%3A53Z&sp=r&sv=2024-08-04&sr=b&scid=5582d94f-1dd4-535d-b03c-d8867278172a&skoid=a3412ad4-1a13-47ce-91a5-c07730964f35&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-21T13%3A16%3A41Z&ske=2025-06-22T13%3A16%3A41Z&sks=b&skv=2024-08-04&sig=hkmQA19u82l4vFIrhTUF5czZBa4cl1JDbHx1lcaoDHA%3D',
            title: 'EcoHub Dashboard',
            desc: 'Harness real-time sustainability insights, track carbon savings, and manage eco-friendly purchases',
            onClick: () => navigate('/greendashboard')
        },
        { icon: '/images/orders.png', title: 'Your Orders', desc: 'Track, return, or buy things again' },
        { icon: '/images/security.png', title: 'Login & security', desc: 'Edit login, name, and mobile number' },
        { icon: '/images/prime.png', title: 'Prime', desc: 'View benefits and payment settings' },
        { icon: '/images/addresses.png', title: 'Your Addresses', desc: 'Edit addresses for orders and gifts' },
        { icon: '/images/business.png', title: 'Your business account', desc: 'Sign up for free to save up to 28% and purchase on credit' },
        { icon: '/images/payment.png', title: 'Payment options', desc: 'Edit or add payment methods' },
        { icon: '/images/balance.png', title: 'Amazon Pay balance', desc: 'Add money to your balance' },
        { icon: '/images/contact.png', title: 'Contact Us', desc: 'Contact service via phone or chat' }
    ];

    return (
        <div>
            <Header />
            <Navbar />
            <div style={{ ...container, padding: '40px' }}>
                <h1 style={titleStyle}>Your Account</h1>
                <div style={gridStyle}>
                    {tiles.map(({ icon, title, desc, onClick }) => {
                        const isActive = activeTile === title;
                        return (
                            <div
                                key={title}
                                style={{
                                    ...baseCard,
                                    ...(isActive ? activeCardStyle : {}),
                                }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, hoveredCard)}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { boxShadow: 'none' })}
                                onMouseDown={() => setActiveTile(title)}
                                onMouseUp={() => setActiveTile(null)}
                                onClick={onClick}
                            >
                                <img src={icon} alt={title} style={iconStyle} />
                                <div>
                                    <h3 style={cardTitle}>{title}</h3>
                                    <p style={cardDesc}>{desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
