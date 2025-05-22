import React, { useState } from 'react';

type Contact = {
  id: string;
  name: string;
  city: string;
  edit: boolean;
  tempName?: string;
  tempCity?: string;
};

const initialContacts: Contact[] = [
  { id: "1", name: "Alice Johnson", city: "New York", edit: false },
  { id: "2", name: "Bob Smith", city: "Los Angeles", edit: false },
  { id: "3", name: "Charlie Brown", city: "Chicago", edit: false },
];

const ContactBook = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const handleAddContact = () => {
    if (!name || !city) {
      alert("Please fill in both fields.");
      return;
    }
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      city,
      edit: false,
    };
    setContacts(prev => [...prev, newContact]);
    setName("");
    setCity("");
  };

  const handleEdit = (id: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? {
              ...contact,
              edit: true,
              tempName: contact.name,
              tempCity: contact.city,
            }
          : contact
      )
    );
  };

  const handleCancel = (id: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? { ...contact, edit: false, tempName: undefined, tempCity: undefined }
          : contact
      )
    );
  };

  const handleUpdate = (id: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? {
              ...contact,
              name: contact.tempName ?? contact.name,
              city: contact.tempCity ?? contact.city,
              edit: false,
              tempName: undefined,
              tempCity: undefined,
            }
          : contact
      )
    );
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleChange = (id: string, field: "tempName" | "tempCity", value: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-primary mb-2">Contact Book</h1>
      <p className="text-lg text-secondary mb-8">Manage your contacts easily!</p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-8 w-full max-w-2xl border-2 border-primary rounded-lg p-4 shadow-md bg-base-100">
        <input
          type="text"
          placeholder="Name..."
          value={name}
          className="input input-bordered w-full sm:max-w-xs"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="City..."
          value={city}
          className="input input-bordered w-full sm:max-w-xs"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary w-full sm:w-auto" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
        {contacts.length === 0 && (
          <div className="text-center col-span-full text-gray-400">
            No contacts yet. Add one above!
          </div>
        )}

        {contacts.map((contact) => (
          <div key={contact.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {contact.edit ? (
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Name..."
                      className="input input-bordered w-full"
                      value={contact.tempName ?? ""}
                      onChange={(e) => handleChange(contact.id, "tempName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="City..."
                      className="input input-bordered w-full"
                      value={contact.tempCity ?? ""}
                      onChange={(e) => handleChange(contact.id, "tempCity", e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <button className="btn btn-error" onClick={() => handleDelete(contact.id)}>
                      Delete
                    </button>
                    <div className="flex gap-2">
                      <button className="btn btn-primary" onClick={() => handleUpdate(contact.id)}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleCancel(contact.id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="card-title text-xl font-semibold">{contact.name}</h2>
                  <p className="text-base text-gray-500">{contact.city}</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-secondary" onClick={() => handleEdit(contact.id)}>
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactBook;
