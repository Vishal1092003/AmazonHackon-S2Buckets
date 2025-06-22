import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/GroupOrder.css';
import axios from 'axios';
import { useStateValue } from "../StateProvider";

const GroupOrderSetup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const cartItems = state?.cartItems || [];
  const [groupName, setGroupName] = useState('My Eco Group');
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");

  const fakeGroupLink = `https://green-commerce.com/group/${encodeURIComponent(groupName.replace(/\s+/g, '-').toLowerCase())}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        // Reverse Geocoding
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0`
          );
          const data = await response.json();
          if (data.status === 'OK') {
            const address = data.results[0].formatted_address;
            setLocationName(address);
          } else {
            setLocationName('Location not found');
          }
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setLocationName('Error getting location');
        }
      },
      (err) => {
        console.error("Location access denied", err);
        alert("Location permission is required to create a group.");
      }
    );
  }, []);

  const getDeadlineDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(deadlineDays));
    return date.toISOString().split('T')[0];
  };

  const handleCreateGroup = async () => {
    setErrorMessage('');
    if (!email) {
      alert("Please log in before creating a group.");
      return navigate("/login");
    }

    if (!coords) {
      return alert("Location not available yet.");
    }

    const deadline = getDeadlineDate();

    if (
      typeof coords.lat !== 'number' ||
      typeof coords.lng !== 'number' ||
      isNaN(coords.lat) ||
      isNaN(coords.lng)
    ) {
      return alert("Invalid coordinates. Please wait for location detection.");
    }
    
    const newGroup = {
      name: groupName,
      link: fakeGroupLink,
      deadline,
      cartItems: basket,
      members: [email],
      latitude: coords.lat,
      longitude: coords.lng,
      location: {
        type: 'Point',
        coordinates: [coords.lng, coords.lat]
      },
      locationName
    };

    try {
      // Create group
      await axios.post('http://localhost:8080/group/create', newGroup, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      try {
        const orderPayload = {
          userEmail: email,
          items: basket.map(item => ({
            productId: item.productId || item.id || '',
            name: item.title || item.name,
            description: item.description || '',
            image: item.image,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          ecoPackaging: false,
          placedAt: new Date(),
          totalAmount: basket.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
          address: locationName,
          deliveryDate: deadline
        };
        await axios.post('http://localhost:8080/place-order', orderPayload);
      } catch (orderErr) {
        console.error('Error saving order:', orderErr);
      }

      // Clear basket after group creation
      dispatch({ type: "CLEAR_BASKET" });

      // Fetch updated group count
      const groupRes = await axios.get('http://localhost:8080/group/my-groups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroupCount(groupRes.data.length);
      setShowBadge(true);

    } catch (err) {
      console.error("Error creating group:", err);
      setErrorMessage('Failed to create group. Please try again.');
    }
  };

  return (
    <div className="group-setup-container">
      <h1>🛠 Create Group Order</h1>
      <p>Invite friends to place a group order together and save shipping + earn eco rewards!</p>

      <div className="group-input">
        <label>Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="group-input">
        <label>Join Deadline (days):</label>
        <input
          type="number"
          value={deadlineDays}
          onChange={(e) => setDeadlineDays(e.target.value)}
        />
      </div>

      <div className="group-input">
        <label>Your Location:</label>
        <input type="text" value={locationName || "Detecting..."} readOnly />
      </div>

      <div className="group-cart">
        <h2>Your Cart ({basket.length} items)</h2>
        {basket.map((item, i) => (
          <div key={i} className="group-cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>Qty: {item.quantity || 1}</p>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="share-section">
        <h3>📤 Share this link with others:</h3>
        <div className="share-link-box">
          <input type="text" readOnly value={fakeGroupLink} />
          <button onClick={() => {
            navigator.clipboard.writeText(fakeGroupLink);
            alert('Link copied to clipboard!');
          }}>Copy</button>
        </div>
      </div>

      {errorMessage && (
        <div className="error-message" style={{ color: 'red', marginBottom: '12px' }}>
          {errorMessage}
        </div>
      )}

      <button className="create-group-btn" onClick={handleCreateGroup}>
        ✅ Create Group
      </button>

      {showBadge && (
        <div className="badge-modal-overlay" onClick={() => setShowBadge(false)}>
          <div className="badge-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Group Badge"
              className="badge-image"
              style={{ width: '100px', marginBottom: '10px' }}
            />
            <h3>🎉 You earned a badge!</h3>
            <p>🏅 Group Champion – Part of {groupCount} group order{groupCount > 1 ? 's' : ''}</p>
            <button className="badge-close" onClick={() => navigate('/my-groups')}>
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupOrderSetup;