import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);

  const handleParse = async () => {
    const res = await fetch("http://localhost:3001/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const json = await res.json();
    setParsedData(json.data);
    setValidation(json.validation);
  };

  useEffect(() => {
    console.log(validation);
  }, [validation]);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Resume Parser</h1>

      <textarea
        className={`w-full h-40 p-4 rounded-md border transition-colors resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${validation?.errors?.length ? "border-red-500" : "border-gray-300"}`}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your resume text here..."
        value={text}
      ></textarea>

      {/* Validation Errors */}
      {validation?.errors && validation.errors.length > 0 && (
        <div className="mt-2 text-red-600 space-y-1">
          {validation.errors.map((err: string, i: number) => (
            <p key={i} className="text-sm">
              • {err}
            </p>
          ))}
        </div>
      )}

      <button
        onClick={handleParse}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300"
      >
        Parse Now
      </button>

      {/* Parsed Data */}
      {parsedData && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Parsed Data</h2>

          {/* Skills Table */}
          {parsedData.skills && parsedData.skills.length > 0 && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-3 text-gray-600">Skills</h3>
              <table className="w-full border-collapse text-left shadow-sm rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Skill</th>
                    <th className="border px-4 py-2">Proficiency Level</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.skills.map((skill: any, i: number) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">{skill.name}</td>
                      <td className="border px-4 py-2">{skill.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Work Experience Table */}
          {parsedData.work_experience && parsedData.work_experience.length > 0 && (
            <section className="mb-10">
              <h3 className="text-xl font-semibold mb-3 text-gray-600">Work Experience</h3>
              <table className="w-full border-collapse text-left shadow-sm rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Company</th>
                    <th className="border px-4 py-2">Start</th>
                    <th className="border px-4 py-2">End</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.work_experience.map((work: any, i: number) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">{work.role}</td>
                      <td className="border px-4 py-2">{work.company}</td>
                      <td className="border px-4 py-2">{work.start}</td>
                      <td className="border px-4 py-2">{work.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Education Table */}
          {parsedData.education && parsedData.education.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-600">Education</h3>
              <table className="w-full border-collapse text-left shadow-sm rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Degree</th>
                    <th className="border px-4 py-2">Institution</th>
                    <th className="border px-4 py-2">Start</th>
                    <th className="border px-4 py-2">End</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.education.map((edu: any, i: number) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">{edu.degree}</td>
                      <td className="border px-4 py-2">{edu.institution}</td>
                      <td className="border px-4 py-2">{edu.start}</td>
                      <td className="border px-4 py-2">{edu.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
