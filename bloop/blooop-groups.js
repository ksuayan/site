
var groups = {
    "cq5": {
        "hosts": {
            "qa": {
                "host": "localhost",
                "port": 4502,
                "username": "",
                "password": ""
            }
        },
        "paths": {
            "waittime": "/connector/waittime",
            "phys-brain-tumor":"/bin/api/physicians/clinic.json/content/shc/en/medical-clinics/brain-tumor-center.json",
            "phys-cancer-center": "/bin/api/physicians/clinic.json/content/shc/en/medical-clinics/cancer-center.json",
            "phys-titles": "/bin/api/physicians/titles.json",
            "clinical-titles": "/bin/api/v1/content/clinicaltitles.json"
        }
    }
};

module.exports = groups;