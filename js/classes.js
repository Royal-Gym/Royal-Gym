import maleClasses from './data.js';
import femaleClasses from './data.js'; 

let currentClasses = [];
let sortDirection = {};

const initClassesData = () =>
{
    let storedClasses = JSON.parse(localStorage.getItem('classes'));
    
    if (!storedClasses || storedClasses.length === 0)
    {
        storedClasses =
        [
            { id: 1, name: "Strength Training", trainer: "Alikhodja Yacine", day: "Monday", time: "09:00", duration: 60, difficulty: "Beginner" },
            { id: 2, name: "CrossFit", trainer: "Galileo Paul", day: "Tuesday", time: "07:00", duration: 45, difficulty: "Advanced" },
            { id: 3, name: "Cardio Fitness", trainer: "Achour Iskander", day: "Wednesday", time: "18:00", duration: 50, difficulty: "Beginner" },
            { id: 4, name: "Personal Training", trainer: "Djaber Mark", day: "Friday", time: "10:00", duration: 55, difficulty: "Beginner" },
            { id: 101, name: "Body Toning", trainer: "Sara Meziani", day: "Monday", time: "10:30", duration: 60, difficulty: "Beginner" },
            { id: 102, name: "Female CrossFit", trainer: "Ines Rahmani", day: "Tuesday", time: "09:00", duration: 45, difficulty: "Intermediate" }
        ];
        
        // حفظ البيانات في localStorage ليتمكن Person 1 من قراءتها في الـ Dashboard
        localStorage.setItem('classes', JSON.stringify(storedClasses));
    }
    
    currentClasses = [...storedClasses];

    buildFiltersUI();
    renderClasses(currentClasses);
    setupSorting();
};

const renderClasses = (data) =>
{
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    if (data.length === 0)
    {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">No classes found matching your criteria.</td></tr>';
        return;
    }

    data.forEach(c =>
    {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td data-label="Class Name">${c.name}</td>
            <td data-label="Trainer">${c.trainer}</td>
            <td data-label="Day">${c.day}</td>
            <td data-label="Time">${c.time}</td>
            <td data-label="Duration">${c.duration} mins</td>
            <td data-label="Level"><span class="badge ${c.difficulty.toLowerCase()}">${c.difficulty}</span></td>
            <td><a href="./trainers.html" class="btn-details">Details</a></td>
        `;
        tbody.appendChild(tr);
    });
};

const buildFiltersUI = () =>
{
    const filterSection = document.getElementById("filters");

    filterSection.innerHTML = `
        <h3>Filter Classes</h3>
        <div class="filter-controls" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
            
            <input type="text" id="trainer-search" placeholder="Search by Trainer..." 
                   style="padding: 0.8rem; border-radius: 0.5rem; border: 1px solid var(--accent); background: var(--bg); color: var(--text-dark); min-width: 200px;">
                   
            <select id="day-filter" style="padding: 0.8rem; border-radius: 0.5rem; border: 1px solid var(--accent); background: var(--bg); color: var(--text-dark); min-width: 150px; cursor: pointer;">
                <option value="All">All Days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>

            <select id="level-filter" style="padding: 0.8rem; border-radius: 0.5rem; border: 1px solid var(--accent); background: var(--bg); color: var(--text-dark); min-width: 150px; cursor: pointer;">
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            
        </div>
    `;

    document.getElementById("day-filter").addEventListener("change", applyFilters);
    document.getElementById("level-filter").addEventListener("change", applyFilters);
    document.getElementById("trainer-search").addEventListener("input", applyFilters);
};

const applyFilters = () =>
{
    const day = document.getElementById("day-filter").value;
    const level = document.getElementById("level-filter").value;
    const search = document.getElementById("trainer-search").value.toLowerCase();

    let filtered = JSON.parse(localStorage.getItem('classes')) || [];

    if (day !== "All")
    {
        filtered = filtered.filter(c => c.day === day);
    }
    if (level !== "All")
    {
        filtered = filtered.filter(c => c.difficulty === level);
    }
    if (search)
    {
        filtered = filtered.filter(c => c.trainer.toLowerCase().includes(search));
    }

    currentClasses = filtered;
    renderClasses(currentClasses);
};

//Sorting Logic;
const setupSorting = () =>
{
    const headers = document.querySelectorAll("th");
    const fields = ["name", "trainer", "day", "time", "duration", "difficulty", null];

    headers.forEach((th, index) =>
    {
        const field = fields[index];
        
        if (field)
        {
            th.style.cursor = "pointer";
            th.title = `Sort by ${field}`;
            
            th.addEventListener("click", () =>
            {
                sortDirection[field] = !sortDirection[field];
                
                currentClasses.sort((a, b) =>
                {
                    let valA = a[field];
                    let valB = b[field];

                    if (field === "duration")
                    {
                        valA = Number(valA);
                        valB = Number(valB);
                    }
                    else
                    {
                        valA = valA.toString().toLowerCase();
                        valB = valB.toString().toLowerCase();
                    }

                    if (valA < valB) return sortDirection[field] ? -1 : 1;
                    if (valA > valB) return sortDirection[field] ? 1 : -1;
                    return 0;
                });
                
                renderClasses(currentClasses);
            });
        }
    });
};
document.addEventListener("DOMContentLoaded", initClassesData);