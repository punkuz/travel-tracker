async function deleteCity(e, id, setCities) {
  e.preventDefault();
  try {
    await fetch(`http://localhost:8000/cities/${id}`, {
      method: "DELETE",
    });
    // Optionally, you might want to update the local state or context to remove the city from the list after deletion.
    setCities((cities) => cities.filter((city) => city.id !== id));
  } catch (error) {
    console.error("Error deleting city:", error);
  }
  // console.log("delete city", id);
}

async function postCity(newCity, setCities) {
  const res = await fetch("http://localhost:8000/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCity),
  });
  const data = await res.json();
  // console.log(data);
  setCities((cities) => [...cities, data]);
}

export { deleteCity, postCity };
