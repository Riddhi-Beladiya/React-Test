import { useState } from "react";
import Header from "./Header";
import { MdOutlineAccountBox } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import sendProfile from "./api/sendProfile";

const AREAS = [
  "Relationship",
  "Anxiety",
  "Depression",
  "OCD",
  "Stress",
  "Self-Esteem",
  "Adolescence",
  "Parenting",
  "Workplace",
  "Eating Disorder",
  "Addiction",
  "Trauma",
  "Grief",
  "Anger Management",
  "Sleep Issues",
  "Sexuality",
  "LGBTQ+",
  "Couples Therapy",
  "Divorce",
  "Financial Stress",
  "Phobias",
  "Confidence",
  "Mindfulness",
  "PTSD",
  "Chronic Illness",
  "Career",
  "Peer Pressure",
  "Social Anxiety",
  "Motivation",
  "Time Management",
];

const CreateProfile = () => {
  const [userType, setUserType] = useState("Seeker");
  const [supporterType, setSupporterType] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [query, setQuery] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [anonymous, setAnonymous] = useState(true);


  // Filter suggestions
  const filteredAreas = AREAS.filter(
    (area) =>
      area.toLowerCase().includes(query.toLowerCase()) &&
      !selectedAreas.includes(area)
  );


  // Add-remove areas
  const addArea = (area) => {
    if (selectedAreas.length < 15) {
      setSelectedAreas([...selectedAreas, area]);
      setQuery("");
    }
  };
  const removeArea = (area) => {
    setSelectedAreas(selectedAreas.filter((a) => a !== area));
  };


  // Validation
  const areaError =
    selectedAreas.length < 3
      ? "Please select at least 3 areas."
      : selectedAreas.length > 15
      ? "You can select a maximum of 15 areas."
      : "";

  //Anonymous checkbox visibility
  const isAnonymousVisible =
    userType === "Seeker" ||
    (userType === "Supporter" && supporterType === "Peer Supporter");

  
  // Form validity  
  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    !areaError &&
    selectedAreas.length >= 3 &&
    selectedAreas.length <= 15 &&
    (userType !== "Supporter" || supporterType);


  // Handle form submission
  const handleSubmit = async () => {
    const profileData = {
      userType,
      supporterType: userType === "Supporter" ? supporterType : "",
      firstName,
      lastName,
      areas: selectedAreas,
      anonymous,
      createdAt: new Date().toISOString(),
    };

    try {
      await sendProfile(profileData);

      alert("Profile Data submitted successfully!");

      // Clear form
      setUserType("Seeker");
      setSupporterType("");
      setFirstName("");
      setLastName("");
      setQuery("");
      setSelectedAreas([]);
      setAnonymous(true);
    } catch (error) {
      console.error(" Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 sm:p-8 relative">
        <Header />

        <h2 className="text-center font-semibold text-xl sm:text-2xl mb-8">
          Create Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>

            {/* User Type */}
            <label className="block font-semibold text-sm sm:text-base mb-3">
              Choose User type
            </label>

            <div className="flex mb-6 rounded-full border overflow-hidden">
              {["Seeker", "Supporter"].map((type) => (
                <button
                  key={type}
                  className={`w-1/2 py-2 text-sm sm:text-base font-medium ${
                    userType === type
                      ? "bg-blue-800 text-white"
                      : "bg-white text-gray-600"
                  }`}

                  onClick={() => {
                    setUserType(type);
                    setSupporterType("");
                  }}
                >
                {type}
                </button>
              ))}

            </div>

            {/* Supporter Type */}
            {userType === "Supporter" && (
              <>
                <label className="block font-semibold text-sm sm:text-base mb-3">
                  Choose Supporter Type
                </label>
                
                <div className="flex mb-6 rounded-full border overflow-hidden">
                  {["Certified Professional", "Peer Supporter"].map((type) => (
                    <button
                      key={type}
                      className={`w-1/2 py-2 text-sm sm:text-base font-medium ${
                        supporterType === type
                          ? "bg-blue-800 text-white"
                          : "bg-white text-gray-600"
                      }`}
                      onClick={() => setSupporterType(type)}
                    >
                    {type}
                    </button>
                  ))}
                  
                </div>
              </>
            )}

            {/* First Name */}
            <div className="mb-4">
              <label className="block font-semibold text-sm sm:text-base mb-3">First Name</label>
              <div className="relative">
                <MdOutlineAccountBox className="absolute left-3 top-1/2 -translate-y-1/2
                  text-gray-500 text-xl" />
                  
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg 
                    text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Enter First Name"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block font-semibold text-sm sm:text-base mb-3">Last Name</label>
              <div className="relative">
                <MdOutlineAccountBox className="absolute left-3 top-1/2 -translate-y-1/2
                 text-gray-500 text-xl" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base 
                   focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
          </div>

          <div>
            {/* Select Area */}
            <label className="block font-semibold text-sm sm:text-base mb-3">
              Select Area
            </label>
            <div className="relative w-full">
              <IoMenuOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500
               text-xl" />
              <input
                type="text"
                className={`w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base 
                   focus:outline-none focus:ring-2 ${
                  areaError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-800"
                }`}
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Suggestions */}
            {query && filteredAreas.length > 0 && (
              <ul className="absolute bg-white border rounded-lg mt-1 w-full max-h-40 
               overflow-y-auto z-10">
                {filteredAreas.map((area) => (
                  <li
                    key={area}
                    onClick={() => addArea(area)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedAreas.map((area) => (
                <span
                  key={area}
                  className="flex items-center bg-purple-100 text-purple-900 px-3 py-1 
                   rounded-full text-xs sm:text-sm font-medium"
                >
                  {area}
                  <button
                    onClick={() => removeArea(area)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {areaError && (
              <p className="text-red-500 text-sm mt-2">{areaError}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-6">
          {isAnonymousVisible && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 accent-blue-800"
              />
              <label className="text-sm sm:text-base text-gray-700">
                continue as <strong>Anonymous user</strong>
              </label>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full sm:w-auto px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base 
              font-semibold transition ${
              isFormValid
                ? "bg-blue-800 hover:bg-blue-900 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            }`}
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
