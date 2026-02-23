import { useState } from "react";

export default function ProfileSettings() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [nic, setnic] = useState();
  const [license, setlicense] = useState();

  const save = (e) => {
    e.preventDefault();
    alert("Profile saved");
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Profile Settings
      </h2>

      <form onSubmit={save} className="bg-white p-4 rounded shadow-sm max-w-lg">
        <label className="block text-sm font-medium">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded my-2"
        />

        <label className="block text-sm font-medium">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded my-2"
        />

        <label className="block text-sm font-medium">E-Mail</label>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="w-full p-2 border rounded my-2"
        />

        <label className="block text-sm font-medium">CNIC</label>
        <input
          value={nic}
          onChange={(e) => setnic(e.target.value)}
          className="w-full p-2 border rounded my-2"
        />

        <label className="block text-sm font-medium">LICENSE</label>
        <input
          value={license}
          onChange={(e) => setlicense(e.target.value)}
          className="w-full p-2 border rounded my-2"
        />

        <div className="mt-3">
          <button className="bg-[#0E2A45] text-white py-2 rounded-lg hover:bg-[#E64D21] transition duration-300 font-medium px-4">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
