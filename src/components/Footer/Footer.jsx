import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import asanaService from "../../api/asanaService";
import { AuthContext } from "../../context/AuthContext";
import "./footer.scss";

export default function Footer() {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      asanaService.getDefaultAsanas().then((data) => {
        console.log("getDefaultAsanas", data);
      });

      asanaService.getRandomAsanas(3).then((data) => {
        console.log("getRandomAsanas", data);
      });

      asanaService.getUserAsanas(user.id).then((data) => {
        console.log("getUserAsanas", data);
      });

      asanaService.getAsana("6267e2774dc8720798465c55").then((data) => {
        console.log("getAsana", data);
      });

      asanaService.getUserSequences(user.id).then((data) => {
        console.log("getUserSequences", data);
      });

      asanaService.getSequence("626937084fff0adc4c4b8d82").then((data) => {
        console.log("getSequence", data);
      });

      asanaService.getUserClasses(user.id, true).then((data) => {
        console.log("getUserClasses", data);
      });

      asanaService.getClass("626937304fff0adc4c4b8d85").then((data) => {
        console.log("getClass", data);
      });
    }

    return () => {};
  }, [loggedIn]);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const result = await signup({
      email: name,
      username: name.split("@")[0],
      password: password,
      validated: true
    });

    if (!result) {
      setError("Invalid username or password!");
    } else {
      setName("");
      setPassword("");
      navigate(`/user/dashboard`);
    }
  }

  return (
    <footer>
      <div className="font-peg md:font-raleway">Footer</div>
      <div className="ml-2 sm:ml-3 md:ml-4 lg:ml-5">Tailwind Beispiel</div>
      <div className="margin-left-ausgelagert">Tailwind ausgelagert!</div>

      <form onSubmit={handleSignup} className="flex gap-4 text-black">
        <input
          className="px-1 rounded-lg w-32"
          type="text"
          minLength={3}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <input
          className="px-1 rounded-lg w-32"
          type="password"
          minLength={4}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="border-dashed border-b-2 hover:text-red-800"
        >
          signup
        </button>
        {error && <div className="text-sm pl-5 pt-2 text-red-500">{error}</div>}
      </form>
    </footer>
  );
}
