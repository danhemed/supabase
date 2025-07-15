const creds = {user_name: 'dan123', password: "39287493"};

fetch("http://localhost:3000/login", {
    method: "POST",
    headres: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
})
    .then(res => res.json())
    .then(console.log)
    .then(console.error)