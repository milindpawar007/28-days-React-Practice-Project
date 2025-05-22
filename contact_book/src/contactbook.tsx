import React from 'react'

const data = [
    { id: "1", name: "Alice Johnson", city: "New York" ,edit:false },
    { id: "2", name: "Bob Smith", city: "Los Angeles", edit:false },
    { id: "3", name: "Charlie Brown", city: "Chicago" ,edit:false },
   
];




const ContactBook = () => {
    const [name, setName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [contacts, setContacts] = React.useState(data);
    const [isEditing, setIsEditing] = React.useState(false);
    const handelClick = () => {
        // Handle the click event for adding a contact
        if (name && city) {
            const newContact = { id: (data.length + 1).toString(), name, city,edit:false };
            setContacts(p => [...p, newContact]);
            setName("");
            setCity("");
            
        } else {
            alert("Please fill in both fields.");
        }
    }
    const handelEdit = (id:string) => {
        // Handle the click event for editing a contact
       console.log(id);
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>{
                if (contact.id === id) {
                    return { ...contact, edit: !contact.edit };
                }
                return contact;
            }   
        ))
        console.log("Edit button clicked");
        
    }
    const handelDelete = (id:string) => {
        // Handle the click event for editing a contact
        
        setContacts(contacts.filter((item)=> item.id !== id))
        
    }
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-primary mb-2">Contact Book</h1>
            <p className="text-lg text-secondary mb-8">Manage your contacts easily!</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-8 w-full max-w-2xl border-2 border-primary rounded-lg p-4 shadow-md bg-base-100">
                <input
                    type="text"
                    placeholder="Name..."
                    value={name?name:""}
                    className="input input-bordered w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-primary transition"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City..."
                    value={city?city:""}
                    className="input input-bordered w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-primary transition"
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2 shadow-lg" onClick={handelClick}>
                    Add Contact
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
                {contacts.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                           
                            {item.edit ?
                            <div className="flex items-center justify-between mt-4">
                                
                                <button className="btn btn-secondary" onClick={() => handelDelete(item.id)}>
                                    Delete
                                </button>
                                <div className="flex gap-2">
                                    <button className="btn btn-secondary">Save</button>
                                    <button className="btn btn-secondary" onClick={() => handelEdit(item.id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            :
                            <>
                                    <h2 className="card-title text-xl font-semibold">{item.name}</h2>
                                    <p className="text-base text-gray-500">{item.city}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <button className="btn btn-secondary" id={item.id} onClick={() => handelEdit(item.id)}>Edit</button>
                                    </div>
                            </>
                    }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactBook;
