const users = [{ id: 1, name: "Andrea" }, { id: 2, name: "Teresa" }, { id: 3, name: "Telmo" }];
const u = users.find(item => item.id === 1);
console.log(u.name);