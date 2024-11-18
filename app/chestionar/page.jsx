"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Survey = () => {
  const [selectedExams, setSelectedExams] = useState({
    exam1: "",
    exam2: "",
    exam3: "",
    exam4: "",
    exam5: "",
    exam6: "",
  });

  const examSuggestions = [
    {
      id: 1,
      professor: "George Mahalu",
      subject: "Metode Numerice",
      dates: ["2024-12-01", "2024-12-03", "2024-12-05"],
    },
    {
      id: 2,
      professor: "Aurelian Rotaru",
      subject: "Fizica",
      dates: ["2024-12-07", "2024-12-09", "2024-12-11"],
    },
    {
      id: 3,
      professor: "Marius Prelipicianu",
      subject: "Metode Numerice",
      dates: ["2024-12-10", "2024-12-12", "2024-12-14"],
    },
    {
      id: 4,
      professor: "Ion Petrescu",
      subject: "Chimie Organică",
      dates: ["2024-12-15", "2024-12-17", "2024-12-19"],
    },
    {
      id: 5,
      professor: "Cristina Vasilescu",
      subject: "Biologie Moleculară",
      dates: ["2024-12-18", "2024-12-20", "2024-12-22"],
    },
    {
      id: 6,
      professor: "Radu Ionescu",
      subject: "Tehnologii de Programare",
      dates: ["2024-12-21", "2024-12-23", "2024-12-25"],
    },
  ];

  const handleChange = (e, examId) => {
    setSelectedExams({ ...selectedExams, [examId]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Chestionar trimis cu succes!");
  };

  return (
    <>
      <Navbar />
      <StyledSurvey>
        <div className="container">
          <h1>Chestionar pentru Stabilirea Datei Examenului</h1>
          <form onSubmit={handleSubmit}>
            {examSuggestions.map((exam) => (
              <div key={exam.id} className="card">
                <div className="card-header">
                  <h2>{exam.subject}</h2>
                  <p>Profesor: {exam.professor}</p>
                </div>
                <div className="card-content">
                  <label htmlFor={`exam${exam.id}`}>
                    Alege data examenului:
                  </label>
                  <select
                    id={`exam${exam.id}`}
                    value={selectedExams[`exam${exam.id}`]}
                    onChange={(e) => handleChange(e, `exam${exam.id}`)}
                  >
                    <option value="">Alege o dată...</option>
                    {exam.dates.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button type="submit" className="submit-button">
              Trimite Răspunsul
            </button>
          </form>
        </div>
      </StyledSurvey>
    </>
  );
};

const StyledSurvey = styled.div`
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background: #f5f5f5;
    border-radius: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .card {
    background: linear-gradient(120deg, #fdfbfb, #ebedee);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h2 {
        font-size: 1.5rem;
        color: #222;
      }

      p {
        font-size: 1rem;
        color: #555;
      }
    }

    .card-content {
      margin-top: 1rem;

      label {
        font-size: 1rem;
        color: #444;
        margin-bottom: 0.5rem;
        display: block;
      }

      select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        background: #fff;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #007bff;
          outline: none;
        }
      }
    }
  }

  .submit-button {
    padding: 0.75rem 1.5rem;
    font-size: 1.2rem;
    color: #fff;
    background: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #0056b3;
    }
  }
`;

export default Survey;
