steps = [
    [
        ## Create the table
        """
		CREATE TABLE positions (
			id SERIAL PRIMARY KEY NOT NULL,
			name VARCHAR(1000) NOT NULL,
			company_id INT NULL,
			description TEXT
		);
		""",
        ## Drop the table
        """
		DROP TABLE positions;
			""",
    ],
    [
        ## Insert data into the table
        """
        INSERT INTO positions
            (name, company_id, description)
        VALUES
            ('Full Stack Software Engineer', '1', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '2', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '3', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '4', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '5', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '6', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '7', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '8', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '9', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '10', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '11', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '12', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '13', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '14', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Full Stack Software Engineer', '15', 'Works to design, test, and implement various software applications on both front-end and back-end.'),
            ('Back-end Software Enginner', '1', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '2', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '3', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '4', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '5', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '6', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '7', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '8', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '9', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '10', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '11', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '12', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '13', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '14', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Back-end Software Enginner', '15', 'Works to design, test, and implement various software applications on the back-end.'),
            ('Front-End Developer', '1', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '2', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '3', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '4', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '5', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '6', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '7', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '8', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '9', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '10', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '11', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '12', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '13', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '14', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Front-End Developer', '15', 'Works to design, test, and implement various software applications on the front-end.'),
            ('Data Engineer', '1', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '2', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '3', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '4', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '5', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '6', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '7', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '8', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '9', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '10', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '11', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '12', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '13', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '14', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Data Engineer', '15', 'Responsible for designing, maintaining, and optimizing data infrastructure for data collection, management, transformation, and access.'),
            ('Quality Assurance', '1', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '2', 'Responsible for monitoring, inspecting and proposing measures to correct or improve thefinal products in order to meet established quality standards.'),
            ('Quality Assurance', '3', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '4', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '5', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '6', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '7', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '8', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '9', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '10', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '11', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '12', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '13', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '14', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Quality Assurance', '15', 'Responsible for monitoring, inspecting and proposing measures to correct or improve the final products in order to meet established quality standards.'),
            ('Data Analyst', '1', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '2', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '3', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '4', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '5', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '6', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '7', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '8', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '9', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '10', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '11', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '12', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '13', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '14', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Data Analyst', '15', 'Responsible for gathering and interpreting data in order to solve a specific problem or prevent it.'),
            ('Project Manager', '1', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '2', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '3', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '4', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '5', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '6', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '7', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '8', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '9', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '10', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '11', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '12', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '13', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '14', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Project Manager', '15', 'Responsible for the project goals, objectives, and scope and creating a project plan that outlines the tasks, timelines, and resources required.'),
            ('Software Development Engineer in Test', '1', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '2', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '3', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '4', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '5', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '6', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '7', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '8', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '9', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '10', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '11', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '12', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '13', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '14', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('Software Development Engineer in Test', '15', 'Combines skills in development with testing and quality assurance to produce and assess programming code to make automated testing programs.'),
            ('DevOps', '1', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '2', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '3', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '4', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '5', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '6', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '7', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '8', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '9', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '10', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '11', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '12', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '13', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '14', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('DevOps', '15', 'Build, test and maintain infrastructure and tools so that software can be developed and released.'),
            ('Cloud Engineer', '1', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '2', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '3', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '4', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '5', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '6', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '7', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '8', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '9', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '10', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '11', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '12', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '13', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '14', 'Deploys, debugs, and executes initiatives related to cloud computing.'),
            ('Cloud Engineer', '15', 'Deploys, debugs, and executes initiatives related to cloud computing.');
        """,
        None,
    ],
]
