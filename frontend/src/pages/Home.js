import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import schoolHero from "../assets/school-hero.jpg";
import teacher from "../assets/teacher.jpg";
import student from "../assets/student.png";
import playground from "../assets/playground.jpg";
import Academy from "../assets/Academy.png";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to School Management System</h1>
          <p>
            Our school provides quality education from <b>Play School</b> to <b>Class 10 </b>in a safe, friendly, and positive environment. We focus on both academic learning and the overall development of students. Our teachers support every child with care guidance, and practical learning. We encourage <b>discipline, creativity, confidence,</b> and good values so that students can grow into responsible and successful individuals. With a comfortable learning environment, modern teaching methods, and equal attention to every student, we aim to make education enjoyable and meaningful. Our school provides a welcoming atmosphere where children can learn, explore their 
            talents, build confidence, and prepare for a bright future.<br/>
            <b>Address:- Noida Sector 63, Noida, Uttar Pradesh 201301, India</b>

          </p>
          {!user && (
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline">
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="hero-image">
          <img src={schoolHero} alt="School management illustration" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3><center>Teacher </center></h3>
         <img src={teacher} alt="teacher" style={{ width: "200px", height: "150px", objectFit: "cover" }}/>
        </div>
        <div className="feature-card">
          <h3><center>Student</center></h3>
          <img src={student} alt="student_picture" style={{ width: "200px", height: "150px", objectFit: "cover" }}/>
        </div>
        <div className="feature-card">
          <h3><center>Playground</center></h3>
          <img src={playground} alt="playground" style={{ width: "200px", height: "150px", objectFit: "cover" }}/>
        </div>
        <div className="feature-card">
          <h3><center>Academy</center></h3>
         <img src={Academy} alt="Academy" style={{ width: "200px", height: "150px", objectFit: "cover" }}/>
        </div>
      </section>
    </div>
  );
};

export default Home;
