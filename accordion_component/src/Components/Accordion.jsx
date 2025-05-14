import React from 'react';

const data = [
  {
    title: "What is GitHub and how does it work?",
    content:
      "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages.",
  },
  {
    title: "How do I see GitHub's availability?",
    content: "Check our real-time status report",
  },
  {
    title: "Why is GitHub so popular?",
    content:
      "GitHub is built by developers for developers. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="accordion">
          <div className="accordion-title" onClick={() => toggleAccordion(index)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
            <div>{item.title}</div>
            <span>{openIndex === index ? "-" : "+"}</span>
          </div>
          {openIndex === index && <div className="accordion-content">{item.content}</div>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
