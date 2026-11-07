// Fetch data from JSON file

fetch("data.json")

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to fetch JSON data");
        }

        return response.json();

    })

    .then(data => {

        console.log("Portfolio Data Loaded:", data);

        // Hide loading message
        document.getElementById("loading").style.display = "none";

        // Show portfolio
        document.getElementById("portfolioContent").classList.remove("d-none");


        // 1. PERSONAL INFORMATION

        document.getElementById("logo").textContent = data.personal.name;

        document.getElementById("heroName").textContent = data.personal.name;

        document.getElementById("heroRole").textContent = data.personal.role;

        document.getElementById("heroIntro").textContent = data.personal.introduction;

        document.getElementById("careerGoal").textContent = data.personal.careerGoal;

        document.getElementById("profileImage").src = data.personal.profileImage;

        document.getElementById("profileImage").alt = data.personal.name;

        document.getElementById("resumeBtn").href = data.personal.resume;


        // 2. NAVBAR

        const navLinks = document.getElementById("navLinks");

        data.navigation.forEach(link => {

            navLinks.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link" href="${link.url}">
                        ${link.name}
                    </a>
                </li>
            `;

        });


        // 3. ABOUT SECTION

        document.getElementById("aboutDescription").textContent =
            data.about.description;

        document.getElementById("aboutEmail").textContent =
            data.personal.email;

        document.getElementById("aboutPhone").textContent =
            data.personal.phone;

        document.getElementById("aboutCourse").textContent =
            data.education[0].course;

        document.getElementById("aboutLocation").textContent =
            data.personal.location;


        // 4. SKILLS SECTION

        const skillsContainer =
            document.getElementById("skillsContainer");

        data.skills.forEach(skill => {

            skillsContainer.innerHTML += `

                <div class="col-md-4 col-sm-6">

                    <div class="skill-card">

                        <div class="skill-icon">
                            <i class="${skill.icon}"></i>
                        </div>

                        <h5>${skill.name}</h5>

                        <div class="progress">

                            <div class="progress-bar"
                                role="progressbar"
                                style="width: ${skill.level}%">

                            </div>

                        </div>

                    </div>

                </div>

            `;

        });


        // 5. PROJECTS SECTION

        const projectsContainer =
            document.getElementById("projectsContainer");

        data.projects.forEach(project => {

            const technologies = project.technologies.map(tech => {

                return `<span class="tech-badge">${tech}</span>`;

            }).join("");


            projectsContainer.innerHTML += `

                <div class="col-lg-6 col-md-6">

                    <div class="project-card">

                        <img src="${project.image}"
                            alt="${project.name}"
                            loading="lazy">

                        <div class="project-content">

                            <h5>${project.name}</h5>

                            <p>${project.description}</p>

                            <div class="mb-3">
                                ${technologies}
                            </div>

                            <a href="${project.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary btn-sm">

                                View Project
                                <i class="bi bi-arrow-up-right"></i>

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });


        // 6. EDUCATION SECTION

        const educationContainer =
            document.getElementById("educationContainer");

        data.education.forEach(edu => {

            educationContainer.innerHTML += `

                <div class="education-card">

                    <h4>${edu.course}</h4>

                    <p>
                        <i class="bi bi-building"></i>
                        ${edu.college}
                    </p>

                    <p>
                        <i class="bi bi-calendar"></i>
                        ${edu.year}
                    </p>

                    <p>
                        <i class="bi bi-book"></i>
                        ${edu.semester}
                    </p>

                    <p>${edu.description}</p>

                </div>

            `;

        });


        // 7. CERTIFICATIONS SECTION

        const certificationsContainer =
            document.getElementById("certificationsContainer");

        data.certifications.forEach(cert => {

            certificationsContainer.innerHTML += `

                <div class="col-md-4 col-sm-6">

                    <div class="certificate-card">

                        <i class="bi ${cert.icon}"></i>

                        <h5>${cert.name}</h5>

                        <p>${cert.organization}</p>

                        <small>${cert.year}</small>

                    </div>

                </div>

            `;

        });


        // 8. FOOTER

        document.getElementById("footerName").textContent =
            data.personal.name;

        document.getElementById("copyright").textContent =
            `© ${new Date().getFullYear()} ${data.personal.name}. All Rights Reserved.`;


        // 9. SOCIAL MEDIA LINKS

        const socialLinks =
            document.getElementById("socialLinks");

        data.socialLinks.forEach(social => {

            socialLinks.innerHTML += `

                <a href="${social.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="${social.name}">

                    <i class="${social.icon}"></i>

                </a>

            `;

        });


    })

    // ERROR HANDLING

    .catch(error => {

        console.error("Error:", error);

        document.getElementById("loading").style.display = "none";

        document.getElementById("errorMessage").classList.remove("d-none");

    });



// 10. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const subject = document.getElementById("contactSubject").value.trim();

    const message = document.getElementById("contactMessage").value.trim();

    const formMessage = document.getElementById("formMessage");


    // Check empty fields

    if (!name || !email || !subject || !message) {

        formMessage.innerHTML = `
            <div class="alert alert-danger">
                Please fill in all the fields!
            </div>
        `;

        return;

    }


    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.innerHTML = `
            <div class="alert alert-danger">
                Please enter a valid email address!
            </div>
        `;

        return;

    }


    // Success message

    formMessage.innerHTML = `
        <div class="alert alert-success">
            Thank you, ${name}! Your form has been validated successfully.
        </div>
    `;


    // Reset form

    contactForm.reset();

});