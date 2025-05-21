
    // Global counters for dynamic fields
    let educationCount = 1;
    let experienceCount = 1;
    let projectCount = 1;
    let certificationCount = 1;
    let additionalCount = 1;


    // Change color theme
    function changeTheme(primary, primaryLight, secondary, accent) {
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--primary-light', primaryLight);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--accent-color', accent);
    
    // Update selected state
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.classList.add('selected');
}
    // Initialize the form with event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listeners to all form inputs
        const formInputs = document.querySelectorAll('#resumeForm input, #resumeForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        // Add event listeners to skill checkboxes
        const skillCheckboxes = document.querySelectorAll('input[name="skills"]');
        skillCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Toggle selected class on the parent label
                if (this.checked) {
                    this.parentElement.classList.add('selected');
                } else {
                    this.parentElement.classList.remove('selected');
                }
                updateResumePreview();
            });
        });

        // Initial update of the resume preview
        updateResumePreview();
        updateProgressBar();
    });

    // Update resume preview in real-time
    function updateResumePreview() {
        // Personal Information
        // Personal Information
        document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
        document.getElementById('previewProfile').textContent = document.getElementById('profile').value || 'Brief summary about yourself and your career objectives will appear here.';

        // Contact Information
        const email = document.getElementById('email').value || 'your.email@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const githubUrl = document.getElementById('github').value;
        const linkedinUrl = document.getElementById('linkedin').value;

        document.getElementById('previewEmail').innerHTML = `<i class="fas fa-envelope"></i> ${email}`;
        document.getElementById('previewPhone').innerHTML = `<i class="fas fa-phone"></i> ${phone}`;

        // GitHub
        if (githubUrl) {
            const githubUsername = githubUrl.includes('github.com/') 
                ? githubUrl.split('github.com/')[1].replace(/\/$/, '')
                : githubUrl;
            document.getElementById('previewGithub').innerHTML = `<i class="fab fa-github"></i> ${githubUsername}`;
        } else {
            document.getElementById('previewGithub').innerHTML = `<i class="fab fa-github"></i> github.com/username`;
        }

        // LinkedIn
        if (linkedinUrl) {
            const linkedinUsername = linkedinUrl.includes('linkedin.com/in/') 
                ? linkedinUrl.split('linkedin.com/in/')[1].replace(/\/$/, '')
                : linkedinUrl;
            document.getElementById('previewLinkedin').innerHTML = `<i class="fab fa-linkedin"></i> ${linkedinUsername}`;
        } else {
            document.getElementById('previewLinkedin').innerHTML = `<i class="fab fa-linkedin"></i> linkedin.com/in/username`;
        }
        document.getElementById('previewProfile').textContent = document.getElementById('profile').value || 'Brief summary about yourself and your career objectives will appear here.';

        // Education
        const educationContainer = document.getElementById('educationContainer');
        const previewEducation = document.getElementById('previewEducation');
        previewEducation.innerHTML = '';

        for (let i = 0; i < educationContainer.children.length; i++) {
            const item = educationContainer.children[i];
            const school = item.querySelector('input[id^="educationSchool"]').value;
            const degree = item.querySelector('input[id^="educationDegree"]').value;
            const date = item.querySelector('input[id^="educationDate"]').value;

            if (school || degree || date) {
                const educationItem = document.createElement('div');
                educationItem.className = 'education-item';
                educationItem.innerHTML = `
                    <div class="item-header">
                        <span class="item-title">${school || 'School/University'}</span>
                        <span class="item-date">${date || 'Date'}</span>
                    </div>
                    <div class="item-subtitle">${degree || 'Degree'}</div>
                `;
                previewEducation.appendChild(educationItem);
            }
        }

        if (previewEducation.children.length === 0) {
            previewEducation.innerHTML = '<p>Your education information will appear here.</p>';
        }

        // Skills
        const previewSkills = document.getElementById('previewSkills');
        previewSkills.innerHTML = '';

        // Add selected skills
        const selectedSkills = document.querySelectorAll('input[name="skills"]:checked');
        selectedSkills.forEach(skill => {
            const skillPill = document.createElement('span');
            skillPill.className = 'skill-pill';
            skillPill.textContent = skill.value;
            previewSkills.appendChild(skillPill);
        });

        // Add other skills
        const otherSkills = document.getElementById('otherSkills').value;
        if (otherSkills) {
            otherSkills.split(',').forEach(skill => {
                const trimmedSkill = skill.trim();
                if (trimmedSkill) {
                    const skillPill = document.createElement('span');
                    skillPill.className = 'skill-pill';
                    skillPill.textContent = trimmedSkill;
                    previewSkills.appendChild(skillPill);
                }
            });
        }

        if (previewSkills.children.length === 0) {
            previewSkills.innerHTML = '<p>Your skills will appear here.</p>';
        }

        // Experience
        const experienceContainer = document.getElementById('experienceContainer');
        const previewExperience = document.getElementById('previewExperience');
        previewExperience.innerHTML = '';

        for (let i = 0; i < experienceContainer.children.length; i++) {
            const item = experienceContainer.children[i];
            const company = item.querySelector('input[id^="experienceCompany"]').value;
            const position = item.querySelector('input[id^="experiencePosition"]').value;
            const date = item.querySelector('input[id^="experienceDate"]').value;
            const description = item.querySelector('textarea[id^="experienceDescription"]').value;

            if (company || position || date || description) {
                const experienceItem = document.createElement('div');
                experienceItem.className = 'experience-item';
                experienceItem.innerHTML = `
                    <div class="item-header">
                        <span class="item-title">${company || 'Company'}</span>
                        <span class="item-date">${date || 'Date'}</span>
                    </div>
                    <div class="item-subtitle">${position || 'Position'}</div>
                    <p>${description || 'Describe your responsibilities and achievements will appear here.'}</p>
                `;
                previewExperience.appendChild(experienceItem);
            }
        }

        if (previewExperience.children.length === 0) {
            previewExperience.innerHTML = '<p>Your work experience will appear here.</p>';
        }

        // Projects
        const projectsContainer = document.getElementById('projectsContainer');
        const previewProjects = document.getElementById('previewProjects');
        previewProjects.innerHTML = '';

        for (let i = 0; i < projectsContainer.children.length; i++) {
            const item = projectsContainer.children[i];
            const name = item.querySelector('input[id^="projectName"]').value;
            const date = item.querySelector('input[id^="projectDate"]').value;
            const description = item.querySelector('textarea[id^="projectDescription"]').value;
            const tech = item.querySelector('input[id^="projectTech"]').value;
            const demoUrl = item.querySelector('input[id^="projectDemo"]').value;
            const codeUrl = item.querySelector('input[id^="projectCode"]').value;

            if (name || date || description || tech || demoUrl || codeUrl) {
                const projectItem = document.createElement('div');
                projectItem.className = 'project-item';
                projectItem.innerHTML = `
                    <div class="item-header">
                        <span class="item-title">${name || 'Project Name'}</span>
                        <span class="item-date">${date || 'Date'}</span>
                    </div>
                    <p>${description || 'Describe your project and your contributions will appear here.'}</p>
                    ${tech ? `<div class="item-subtitle">Technologies: ${tech}</div>` : ''}
                    <div class="project-links">
                        ${demoUrl ? `<a href="${demoUrl}" target="_blank" class="project-link" id="previewProjectDemo${i}">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                        ${codeUrl ? `<a href="${codeUrl}" target="_blank" class="project-link" id="previewProjectCode${i}">
                            <i class="fab fa-github"></i> View Code
                        </a>` : ''}
                    </div>
                `;
                previewProjects.appendChild(projectItem);
            }
        }

        if (previewProjects.children.length === 0) {
            previewProjects.innerHTML = '<p>Your projects will appear here.</p>';
        }

        // Certifications
        const certificationsContainer = document.getElementById('certificationsContainer');
        const previewCertifications = document.getElementById('previewCertifications');
        previewCertifications.innerHTML = '';

        for (let i = 0; i < certificationsContainer.children.length; i++) {
            const item = certificationsContainer.children[i];
            const name = item.querySelector('input[id^="certificationName"]').value;
            const org = item.querySelector('input[id^="certificationOrg"]').value;
            const date = item.querySelector('input[id^="certificationDate"]').value;
            const expiry = item.querySelector('input[id^="certificationExpiry"]').value;
            const id = item.querySelector('input[id^="certificationId"]').value;
            const url = item.querySelector('input[id^="certificationUrl"]').value;

            if (name || org || date || expiry || id || url) {
                const certificationItem = document.createElement('div');
                certificationItem.className = 'certification-item';
                certificationItem.innerHTML = `
                    <div class="item-header">
                        <span class="item-title">${name || 'Certification Name'}</span>
                        <span class="item-date">${date || 'Date Earned'}</span>
                    </div>
                    ${org ? `<div class="item-subtitle">Issued by: ${org}</div>` : ''}
                    ${(expiry || id) ? `<p>${expiry ? `Expiration: ${expiry}` : ''}${(expiry && id) ? ' | ' : ''}${id ? `Credential ID: ${id}` : ''}</p>` : ''}
                    ${url ? `<div class="certification-links">
                        <a href="${url}" target="_blank" class="certification-link" id="previewCertificationUrl${i}">
                            <i class="fas fa-external-link-alt"></i> View Credential
                        </a>
                    </div>` : ''}
                `;
                previewCertifications.appendChild(certificationItem);
            }
        }

        if (previewCertifications.children.length === 0) {
            previewCertifications.innerHTML = '<p>Your certifications will appear here.</p>';
        }

        // Additional Information
        const additionalContainer = document.getElementById('additionalContainer');
        const previewAdditional = document.getElementById('previewAdditional');
        previewAdditional.innerHTML = '';

        for (let i = 0; i < additionalContainer.children.length; i++) {
            const item = additionalContainer.children[i];
            const title = item.querySelector('input[id^="additionalTitle"]').value;
            const description = item.querySelector('textarea[id^="additionalDescription"]').value;

            if (title || description) {
                const additionalItem = document.createElement('div');
                additionalItem.className = 'additional-item';
                additionalItem.innerHTML = `
                    ${title ? `<h4 class="item-title">${title}</h4>` : ''}
                    ${description ? `<p>${description}</p>` : ''}
                `;
                previewAdditional.appendChild(additionalItem);
            }
        }

        if (previewAdditional.children.length === 0) {
            previewAdditional.innerHTML = '<p>Your additional information will appear here.</p>';
        }

        // Update progress bar
        updateProgressBar();
    }

    // Add new education field
    function addEducation() {
        const container = document.getElementById('educationContainer');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item education-item';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="form-group">
                <label for="educationSchool${educationCount}">School/University</label>
                <input type="text" id="educationSchool${educationCount}" placeholder="University of Example">
            </div>
            <div class="form-group">
                <label for="educationDegree${educationCount}">Degree</label>
                <input type="text" id="educationDegree${educationCount}" placeholder="Bachelor of Science in Computer Science">
            </div>
            <div class="form-group">
                <label for="educationDate${educationCount}">Date</label>
                <input type="text" id="educationDate${educationCount}" placeholder="2015 - 2019">
            </div>
        `;
        container.appendChild(newItem);
        educationCount++;

        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        updateResumePreview();
    }

    // Add new experience field
    function addExperience() {
        const container = document.getElementById('experienceContainer');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item experience-item';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="form-group">
                <label for="experienceCompany${experienceCount}">Company</label>
                <input type="text" id="experienceCompany${experienceCount}" placeholder="Tech Corp Inc.">
            </div>
            <div class="form-group">
                <label for="experiencePosition${experienceCount}">Position</label>
                <input type="text" id="experiencePosition${experienceCount}" placeholder="Software Developer">
            </div>
            <div class="form-group">
                <label for="experienceDate${experienceCount}">Date</label>
                <input type="text" id="experienceDate${experienceCount}" placeholder="2019 - Present">
            </div>
            <div class="form-group">
                <label for="experienceDescription${experienceCount}">Description</label>
                <textarea id="experienceDescription${experienceCount}" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        `;
        container.appendChild(newItem);
        experienceCount++;

        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        updateResumePreview();
    }

    // Add new project field
    function addProject() {
        const container = document.getElementById('projectsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item project-item';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="form-group">
                <label for="projectName${projectCount}">Project Name</label>
                <input type="text" id="projectName${projectCount}" placeholder="E-commerce Website">
            </div>
            <div class="form-group">
                <label for="projectDate${projectCount}">Date</label>
                <input type="text" id="projectDate${projectCount}" placeholder="Jan 2023 - Mar 2023">
            </div>
            <div class="form-group">
                <label for="projectDescription${projectCount}">Description</label>
                <textarea id="projectDescription${projectCount}" placeholder="Describe your project and your contributions"></textarea>
            </div>
            <div class="form-group">
                <label for="projectTech${projectCount}">Technologies Used</label>
                <input type="text" id="projectTech${projectCount}" placeholder="React, Node.js, MongoDB">
            </div>
            <div class="form-group">
                <label for="projectDemo${projectCount}">Demo URL</label>
                <input type="url" id="projectDemo${projectCount}" placeholder="https://example.com/demo">
            </div>
            <div class="form-group">
                <label for="projectCode${projectCount}">Code Repository</label>
                <input type="url" id="projectCode${projectCount}" placeholder="https://github.com/username/project">
            </div>
        `;
        container.appendChild(newItem);
        projectCount++;

        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        updateResumePreview();
    }

    // Add new certification field
    function addCertification() {
        const container = document.getElementById('certificationsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item certification-item';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="form-group">
                <label for="certificationName${certificationCount}">Certification Name</label>
                <input type="text" id="certificationName${certificationCount}" placeholder="AWS Certified Solutions Architect">
            </div>
            <div class="form-group">
                <label for="certificationOrg${certificationCount}">Issuing Organization</label>
                <input type="text" id="certificationOrg${certificationCount}" placeholder="Amazon Web Services">
            </div>
            <div class="form-group">
                <label for="certificationDate${certificationCount}">Date Earned</label>
                <input type="text" id="certificationDate${certificationCount}" placeholder="June 2022">
            </div>
            <div class="form-group">
                <label for="certificationExpiry${certificationCount}">Expiration Date (if applicable)</label>
                <input type="text" id="certificationExpiry${certificationCount}" placeholder="June 2025">
            </div>
            <div class="form-group">
                <label for="certificationId${certificationCount}">Credential ID (if applicable)</label>
                <input type="text" id="certificationId${certificationCount}" placeholder="AWS-123456789">
            </div>
            <div class="form-group">
                <label for="certificationUrl${certificationCount}">Credential URL</label>
                <input type="url" id="certificationUrl${certificationCount}" placeholder="https://www.credly.com/badges/123456">
            </div>
        `;
        container.appendChild(newItem);
        certificationCount++;

        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        updateResumePreview();
    }

    // Add new additional information field
    function addAdditional() {
        const container = document.getElementById('additionalContainer');
        const newItem = document.createElement('div');
        newItem.className = 'dynamic-item additional-item';
        newItem.innerHTML = `
            <button type="button" class="remove-btn" onclick="removeItem(this)">×</button>
            <div class="form-group">
                <label for="additionalTitle${additionalCount}">Title</label>
                <input type="text" id="additionalTitle${additionalCount}" placeholder="Languages, Volunteer Work, etc.">
            </div>
            <div class="form-group">
                <label for="additionalDescription${additionalCount}">Description</label>
                <textarea id="additionalDescription${additionalCount}" placeholder="Details about this additional information"></textarea>
            </div>
        `;
        container.appendChild(newItem);
        additionalCount++;

        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });

        updateResumePreview();
    }

    // Remove dynamic item
    function removeItem(button) {
        const container = button.closest('.dynamic-section');
        if (container.children.length > 1) {
            button.parentElement.remove();
            updateResumePreview();
        } else {
            alert("You need to have at least one item in this section.");
        }
    }

    // Clear form
    function clearForm() {
        if (confirm('Are you sure you want to clear the entire form?')) {
            document.getElementById('resumeForm').reset();
            // Add this with the other field resets
            document.getElementById('github').value = '';
            document.getElementById('linkedin').value = '';
            // Clear dynamic sections (keep one item each)
            const educationContainer = document.getElementById('educationContainer');
            while (educationContainer.children.length > 1) {
                educationContainer.removeChild(educationContainer.lastChild);
            }
            educationCount = 1;
            
            const experienceContainer = document.getElementById('experienceContainer');
            while (experienceContainer.children.length > 1) {
                experienceContainer.removeChild(experienceContainer.lastChild);
            }
            experienceCount = 1;
            
            const projectsContainer = document.getElementById('projectsContainer');
            while (projectsContainer.children.length > 1) {
                projectsContainer.removeChild(projectsContainer.lastChild);
            }
            projectCount = 1;
            
            const certificationsContainer = document.getElementById('certificationsContainer');
            while (certificationsContainer.children.length > 1) {
                certificationsContainer.removeChild(certificationsContainer.lastChild);
            }
            certificationCount = 1;
            
            const additionalContainer = document.getElementById('additionalContainer');
            while (additionalContainer.children.length > 1) {
                additionalContainer.removeChild(additionalContainer.lastChild);
            }
            additionalCount = 1;
            
            // Reset the first items in each dynamic section
            educationContainer.querySelector('input[id^="educationSchool"]').value = '';
            educationContainer.querySelector('input[id^="educationDegree"]').value = '';
            educationContainer.querySelector('input[id^="educationDate"]').value = '';
            
            experienceContainer.querySelector('input[id^="experienceCompany"]').value = '';
            experienceContainer.querySelector('input[id^="experiencePosition"]').value = '';
            experienceContainer.querySelector('input[id^="experienceDate"]').value = '';
            experienceContainer.querySelector('textarea[id^="experienceDescription"]').value = '';
            
            projectsContainer.querySelector('input[id^="projectName"]').value = '';
            projectsContainer.querySelector('input[id^="projectDate"]').value = '';
            projectsContainer.querySelector('textarea[id^="projectDescription"]').value = '';
            projectsContainer.querySelector('input[id^="projectTech"]').value = '';
            projectsContainer.querySelector('input[id^="projectDemo"]').value = '';
            projectsContainer.querySelector('input[id^="projectCode"]').value = '';
            
            certificationsContainer.querySelector('input[id^="certificationName"]').value = '';
            certificationsContainer.querySelector('input[id^="certificationOrg"]').value = '';
            certificationsContainer.querySelector('input[id^="certificationDate"]').value = '';
            certificationsContainer.querySelector('input[id^="certificationExpiry"]').value = '';
            certificationsContainer.querySelector('input[id^="certificationId"]').value = '';
            certificationsContainer.querySelector('input[id^="certificationUrl"]').value = '';
            
            additionalContainer.querySelector('input[id^="additionalTitle"]').value = '';
            additionalContainer.querySelector('textarea[id^="additionalDescription"]').value = '';
            
            // Uncheck all skill checkboxes
            document.querySelectorAll('input[name="skills"]').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.parentElement.classList.remove('selected');
            });
            
            updateResumePreview();
        }
    }

    // Update progress bar
    function updateProgressBar() {
        const totalFields = 9; // Basic fields (name, email, phone, profile, at least one education, at least one skill, at least one experience, at least one certification, at least one additional info)
        let completedFields = 0;

        // Check basic fields
        if (document.getElementById('name').value) completedFields++;
        if (document.getElementById('email').value) completedFields++;
        if (document.getElementById('phone').value) completedFields++;
        if (document.getElementById('profile').value) completedFields++;

        // Check education (at least one field filled in the first education item)
        const firstEducation = document.getElementById('educationContainer').firstElementChild;
        if (firstEducation.querySelector('input[id^="educationSchool"]').value || 
            firstEducation.querySelector('input[id^="educationDegree"]').value || 
            firstEducation.querySelector('input[id^="educationDate"]').value) {
            completedFields++;
        }

        // Check skills (at least one selected)
        if (document.querySelector('input[name="skills"]:checked') || document.getElementById('otherSkills').value) {
            completedFields++;
        }

        // Check experience (at least one field filled in the first experience item)
        const firstExperience = document.getElementById('experienceContainer').firstElementChild;
        if (firstExperience.querySelector('input[id^="experienceCompany"]').value || 
            firstExperience.querySelector('input[id^="experiencePosition"]').value || 
            firstExperience.querySelector('input[id^="experienceDate"]').value || 
            firstExperience.querySelector('textarea[id^="experienceDescription"]').value) {
            completedFields++;
        }

        // Check certifications (at least one field filled in the first certification item)
        const firstCertification = document.getElementById('certificationsContainer').firstElementChild;
        if (firstCertification.querySelector('input[id^="certificationName"]').value || 
            firstCertification.querySelector('input[id^="certificationOrg"]').value || 
            firstCertification.querySelector('input[id^="certificationDate"]').value) {
            completedFields++;
        }

        // Check additional information (at least one field filled in the first additional item)
        const firstAdditional = document.getElementById('additionalContainer').firstElementChild;
        if (firstAdditional.querySelector('input[id^="additionalTitle"]').value || 
            firstAdditional.querySelector('textarea[id^="additionalDescription"]').value) {
            completedFields++;
        }

        const progressPercentage = (completedFields / totalFields) * 100;
        document.getElementById('progressBar').style.width = `${progressPercentage}%`;
    }

    // Download as PDF (using html2pdf library - would need to be included)
    function downloadPDF() {
        alert("PDF download functionality would be implemented here with a library like html2pdf.js");
        // In a real implementation, you would include html2pdf.js and use:
        
        const element = document.getElementById('resumePreview');
        const opt = {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    }
