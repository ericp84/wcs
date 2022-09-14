import "./skills.css";

// import { useState } from "react";

const Skills = ({ skills }) => {
  // const [updateVotes, setUpdateVotes] = useState(0);

  return (
    <div className="skills">
      {skills.map((skill, idx) => (
        // return (
        <div className="skillsMap" key={idx}>
          <div className="title">{skill.title}</div>
          <div className="votes">{skill.votes}</div>
        </div>
        // );
      ))}
    </div>
  );
};

export default Skills;