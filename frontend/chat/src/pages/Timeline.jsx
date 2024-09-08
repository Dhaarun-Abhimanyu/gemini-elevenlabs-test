import React, { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import { useNavigate } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import '../components/App.css';

const Timeline = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const timelineData = [
    { title1: 'Battle of Gingee (1644-1677)',description1: "Gingee Fort in Tamil Nadu became a significant military stronghold for the Marathas and later the Mughals. The fort was seized by the Bijapur Sultanate, and later came under the control of Chhatrapati Shivaji's forces in the 1670s. It remained a critical point in the Maratha-Mughal struggle.",title2:'Madurai Nayak Kingdom’s Decline:', description2: "By the late 17th century, the once-powerful Madurai Nayak Kingdom saw its decline. Internal strife and invasions weakened its hold over South India, leading to increased instability in the region.",title3:'Mysore’s Rise under Raja Wodeyar (1638-1673):', description3: "Raja Wodeyar became the king of Mysore and it gradually rose in prominence. The foundation of the Mysore Kingdom's future strength was laid during this period, which would later come into significant conflict with British forces in the 18th century.", year: '1650-1700', image: "src/assets/1650-1700.png" ,link: 'page1'},
    { title1: 'Battle of Trichinopoly (1741):',description1: "Fought between the Marathas and the Nawab of Arcot, this battle led to Maratha victory over the Nawab forces, consolidating their control over Southern territories. It was part of the ongoing Maratha Empire's expansion into Southern India.",title2:'Marathas and the Siege of Tanjore (1740):', description2: 'Maratha forces under Raghoji Bhonsle seized the kingdom of Tanjore from its local rulers. This extended the Maratha influence deep into Southern India and signaled an era of frequent conflicts between regional powers and the Marathas.',title3:"Nawab of Arcot's Alliance with the British (1740s):", description3: 'The Nawab of Arcot, Anwar-ud-Din, began an alliance with the British East India Company in the 1740s. This period marked the increasing involvement of British forces in South Indian politics, laying the groundwork for future conflicts.', year: '1700-1750', image: "src/assets/1650-1700.png" ,link: 'page3'},
    { title1: 'Anglo-French Wars and Carnatic Wars (1746-1763):',description1: 'South India witnessed a series of conflicts between the British and the French, primarily in the Carnatic region. The wars were significant as both powers tried to gain control of key South Indian regions. The Third Carnatic War (1756-1763) marked the end of French power in India.',title2:"Hyder Ali's Rule (1761-1782):", description2: 'Hyder Ali rose to power in the Kingdom of Mysore, turning it into a formidable military force. His resistance against the British culminated in the First and Second Anglo-Mysore Wars.',title3:'Veerapandiya Kattabomman (1799):', description3: 'Veerapandiya Kattabomman was the chieftain of Panchalankurichi. His refusal to pay taxes to the British led to a fierce conflict, and he was eventually captured and hanged in 1799. Kattabomman is remembered as one of the first leaders in South India to resist British rule.', year: '1750-1800', image: "src/assets/1650-1700.png" ,link: 'characters'},
    { title1: 'Velu Nachiyar’s Rebellion (1780s):',description1: 'Queen Velu Nachiyar of Sivagangai was one of the earliest Indian queens to fight against British colonial power. She waged guerrilla warfare against the British and was aided by Hyder Ali. She successfully recaptured her kingdom in 1780, becoming the first Indian queen to rebel against the British.',title2:'Third Anglo-Mysore War (1790-1792):', description2: "Tipu Sultan, Hyder Ali’s son, continued his father's fight against the British in the Third Anglo-Mysore War. Though Tipu initially saw some victories, the war ended with the Treaty of Seringapatam, where Mysore lost significant territories to the British."
,title3:'Poligar Wars (1799-1805):', description3: "The Poligar Wars were a series of conflicts between the British and local feudal lords (Poligars) in South India, particularly in Tamil Nadu. After Kattabomman’s execution, the rebellion continued under the leadership of other Poligars, who resisted British taxation and control. The wars marked an early phase of local resistance to British rule.", year: '1800-1850', image: "src/assets/1650-1700.png" ,link: 'page1'},
    { title1: 'Vellore Mutiny (1806):',description1: "The Vellore Mutiny was one of the earliest large-scale revolts against British rule. Indian soldiers protested against changes to their uniforms that they saw as an insult to their religious beliefs. Though the mutiny was suppressed, it predated the Indian Rebellion of 1857 by over fifty years."
,title2:'Rebellion of Marudhu Brothers (1801):', description2: 'The Marudhu Brothers of Sivagangai organized a major rebellion against British rule in 1801. They allied with other local rulers and Poligars but were eventually defeated. Their resistance is remembered as one of the key moments of South Indian rebellion.',title3:'Formation of Madras Mahajana Sabha (1884):', description3: 'The Madras Mahajana Sabha was one of the earliest Indian political organizations, formed in 1884 in response to growing British administrative control. It became a platform for intellectuals and freedom fighters in South India to voice their opposition to British policies. This organization laid the groundwork for the Indian National Congress’s establishment.', year: '1850-1900', image: "src/assets/1650-1700.png" ,link: 'page1'},
  ];

  // This function now appends the path to the home route '/'
  const handleCircleClick = (link) => {
    navigate(`/${link}`); // Prepend '/' to each link
  };

  const handleHover = (item, index, event) => {
    setHoveredItem(item);
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredItem(null);
    setHoveredIndex(null);
  };

  const infoBoxStyles = {
    position: 'fixed',
    left: hoveredIndex !== null && hoveredIndex % 2 === 0 ? '100px' : 'auto',
    right: hoveredIndex !== null && hoveredIndex % 2 !== 0 ? '100px' : 'auto',
    width: '80%',
    height: '85%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    opacity: hoveredItem ? 1 : 0,  // Controls visibility
    transform: hoveredItem ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',  // Animation for entrance
    transition: 'transform 0.4s ease, opacity 0.4s ease',  // Smooth transition
    pointerEvents: hoveredItem ? 'auto' : 'none',  // Prevent interaction when not hovered
  };

  return (
    <div className="timeline-container" style={{ position: 'relative' }}>
      <button className='back-button' onClick={() => navigate(-1)}>&#8592; Back</button>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <TimelineItem
              item={item}
              onHover={(event) => handleHover(item, index, event)}
              onLeave={handleLeave}
              onClick={() => handleCircleClick(item.link)} // Handle click with updated links
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: index % 2 === 0 ? '-100px' : 'auto',
                right: index % 2 !== 0 ? '-100px' : 'auto',
                opacity: 1,
                whiteSpace: 'nowrap',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {item.year}
            </span>
          </div>
        ))}
      </div>

      {hoveredItem && (
        <InfoBox item={hoveredItem} style={infoBoxStyles} />
      )}
    </div>
  );
};

export default Timeline;
