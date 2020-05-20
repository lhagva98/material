export const employeeRoles = [
    {
        id: "1",
        name: "Захирал",
    },
    {
        id: "2",
        name: "Менежер",
    },
    {
        id: "3",
        name: "Ажилтан",
    },
]

export const employeeInitial = {
    id: '',
    username: '',
    lastname: '',
    firstname: '',
    dateOfBirth: '',
    registrationNo: '',
    phoneNumber: '',
    email: '',
    departmentId: '',
    role: '',
    password: '',
    companyId: ''
}

export const planInitial = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    file: ''
}

export const assignmentInitial = {
    id: '',
    evaluationType: '',
    act: '',
    capital: '',
    currentSituation: '',
    requirement: '',
    scope: '',
    startDate: '',
    endDate: '',
    goal: '',

}

export const requirementInitial = [
    {
        id: 0,
        name: 'Бүтээгдэхүүн нь чанарын шаардлага хангасан байна.',
        scale: 25,
    },
    {
        id: 1,
        name: 'Хэрэглэгчдэд хүрсэн байна.',
        scale: 25,
    },
    {
        id: 2,
        name: 'Хэрэгтэй мэдээллүүдийг харуулдаг байна.',
        scale: 25,
    },
    {
        id: 3,
        name: 'Чанарын индексийг сайжруулна.',
        scale: 25,
    },
]

export const GOevaluationType = [
    {
        id: 0,
        name: 'Үр дүнгээр үнэлэх',
        col: ['act', 'capital', 'currentSituation', 'requirement', 'goal'],
    },
    {
        id: 1,
        name: 'Гүйцэтгэлээр үнэлэх',
        table: 'single',
        col: ['act', 'capital', 'currentSituation', 'requirement', 'goal'],
    }
]