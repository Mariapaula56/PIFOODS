/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecipes, getDiets } from "../actions/actions";
import { Link } from "react-router-dom";
import "./create.css";

export default function recipeCreate() {
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: [],
    dieta: [],
  });

  const [text, setText] = useState();
  const [indice, setIndice] = useState(1);

  const [errorName, setErrorName] = useState("");
  const [errorSummary, setErrorSummary] = useState("");
  const [errorHealth, setErrorHealth] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorSteps, setErrorSteps] = useState("");

  const validate = () => {
    if (input.name.length === 0) {
      setErrorName("Name required");
    } else {
      setErrorName("");
    }
    if (input.summary.length <= 0) {
      setErrorSummary("Summary required");
    } else {
      setErrorSummary("");
    }
    if (input.healthScore > 100 || input.healthScore < 1) {
      setErrorHealth("The healthscore must be in a range from 1 to 100");
    } else {
      setErrorHealth("");
    }
    if (input.image.length <= 0) {
      setErrorImage("Image required");
    } else {
      setErrorImage("");
    }
    if (input.steps.length === 0) {
      setErrorSteps("Step is required");
    } else {
      setErrorSteps("");
    }
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleSelect(e) {
    setInput({
      ...input,
      dieta: [...input.dieta, e.target.value],
    });
  }

  function handleSteps(e) {
    console.log(e);
    setText(e.target.value);
  }

  function handleClick(e) {
    let stringPasos = {};
    setIndice(indice + 1);
    stringPasos = { number: indice, step: text };
    setInput({
      ...input,
      steps: [...input.steps, stringPasos],
    });
    setText("");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    validate();
  }, [input]);

  function deleteStep(name) {
    let pasos = [...input.steps];
    pasos = pasos.filter((p) => p.step.toLowerCase() !== name.toLowerCase());
    setInput({
      ...input,
      steps: pasos,
    });
  }

  function deleteDiet(dieta) {
    let dietas = [...input.dieta];
    dietas = dietas.filter((d) => d !== dieta);
    setInput({
      ...input,
      dieta: dietas,
    });
  }

  console.log(
    errorName.length === 0 ||
      errorSummary.length === 0 ||
      errorSteps.length === 0 ||
      errorHealth.length === 0 ||
      errorImage.length === 0
  );
  console.log(errorName.length, errorName);

  return (
    <div className="container3">
      <div className="form">
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="title">CREATE RECIPE</h2>
          <div className="create-title">
            <div>
              <div className="titles">
                <label htmlFor="1">
                  <strong>Name:</strong>
                </label>
                <br />
              </div>
              <div className="input">
                <input
                  key="name"
                  id="1"
                  placeholder="Name"
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {errorName && <p>{errorName}</p>}
              </div>
            </div>

            <div>
              <div className="titles">
                <label htmlFor="2">
                  <strong>Image:</strong>
                </label>
                <br />
              </div>
              <div className="image">
                <input
                  key="image"
                  placeholder="https://example.com"
                  id="2"
                  type="url"
                  value={input.image}
                  name="image"
                  pattern="https://.*"
                  onChange={(e) => handleChange(e)}
                />
                {errorImage && <p>{errorImage}</p>}
              </div>
            </div>
            <div>
              <div className="titles">
                <label htmlFor="3">
                  <strong>Summary:</strong>
                </label>
                <br />
              </div>
              <div className="summary">
                <textarea
                  key="summary"
                  id="3"
                  placeholder="Summary..."
                  type="text"
                  value={input.summary}
                  name="summary"
                  rows="3"
                  onChange={(e) => handleChange(e)}
                />
                {errorSummary && <p>{errorSummary}</p>}
              </div>
            </div>
            <div className="titles">
              <label htmlFor="4">
                <strong>HealthScore:</strong>
              </label>
              <br />
              <div className="score1">
                <input
                  key="healthScore"
                  id="3"
                  placeholder="'Score'"
                  type="number"
                  value={input.healthScore}
                  name="healthScore"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {errorHealth && <p>{errorHealth}</p>}
            </div>
            <div>
              <div className="titles">
                <label htmlFor="5">
                  <strong>Steps:</strong>
                </label>
                <br />
              </div>
              <div className="steps">
                <input
                  key="steps"
                  id="5"
                  placeholder="steps..."
                  value={text}
                  name="steps"
                  onChange={(e) => handleSteps(e)}
                ></input>
                {<button onClick={() => handleClick()}>Add step</button>}
                {errorSteps && <p>{errorSteps}</p>}

                {input.steps?.map((p, i) => (
                  <div>
                    {`${i + 1} - ${p.step}`}
                    <button onClick={() => deleteStep(p.step)}>X</button>
                  </div>
                ))}
              </div>
            </div>
            <div htmlFor="6" className="dietas">
              <select
                key="dieta"
                value="recipes"
                onChange={(e) => handleSelect(e)}
              >
                {dietas?.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>
            {input.dieta.length > 0 &&
              input.dieta.map((diet) => (
                <div>
                  {diet}
                  <button
                    onClick={() => {
                      deleteDiet(diet);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}

            <button
              className="button-create"
              disabled={
                errorName.length !== 0 ||
                errorSummary.length !== 0 ||
                errorSteps.length !== 0 ||
                errorHealth.length !== 0 ||
                errorImage.length !== 0
              }
              type="submit"
              onClick={() => {
                dispatch(addRecipes(input));
                alert("Recipe Created Successfully");
                setInput({
                  name: "",
                  image: "",
                  summary: "",
                  healthScore: 0,
                  steps: [],
                  dieta: [],
                });
              }}
            >
              Create recipe
            </button>

            <Link to={"/Home"}>Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
