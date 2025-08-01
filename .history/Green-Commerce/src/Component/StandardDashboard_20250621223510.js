import React from 'react';
import Header from './Header';
import Navbar from "./navbar"
export default function StandardDashboard() {
    const container = { padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6' };
    const titleStyle = { fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#111827' };
    const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' };
    const card = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', transition: 'box-shadow 0.2s' };
    const cardHover = e => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    const cardUnhover = e => e.currentTarget.style.boxShadow = 'none';
    const iconStyle = { width: '40px', height: '40px', marginRight: '16px', flexShrink: 0 };
    const textBlock = {};
    const cardTitle = { fontSize: '18px', fontWeight: '500', margin: 0, color: '#111827' };
    const cardDesc = { fontSize: '14px', margin: '4px 0 0', color: '#6b7280' };

    const tiles = [
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png', title: 'Your Orders', desc: 'Track, return, or buy things again' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png', title: 'Login & security', desc: 'Edit login, name, and mobile number' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png', title: 'Prime', desc: 'View benefits and payment settings' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png', title: 'Your Addresses', desc: 'Edit addresses for orders and gifts' },
        { icon: 'https://m.media-amazon.com/images/G/31/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250268_.jpg', title: 'Your business account', desc: 'Sign up for free to save up to 28% and purchase on credit' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png', title: 'Payment options', desc: 'Edit or add payment methods' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png', title: 'Amazon Pay balance', desc: 'Add money to your balance' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png', title: 'Contact Us', desc: 'Contact service via phone or chat' },
        { icon: 'https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png', title: 'EcoHub Dashboard', desc: 'Contact service via phone or chat' }

    ];

    return (
        <div>
              <Header/>
              <Navbar/>
            <div style={{ ...container, padding: '40px' }}>
                <h1 style={titleStyle}>Your Account</h1>
                <div style={gridStyle}>
                    {tiles.map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            style={card}
                            onMouseOver={cardHover}
                            onMouseOut={cardUnhover}
                        >
                            <img src={icon} alt="" style={iconStyle} />
                            <div style={textBlock}>
                                <h3 style={cardTitle}>{title}</h3>
                                <p style={cardDesc}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
       
    );
}
