import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/db"
import User from "@/models/User"
import Mentor from "@/models/Mentor"

export async function GET() {
  try {
    await connectDB()

    // Check if we already have users
    const userCount = await User.countDocuments()

    // if (userCount > 0) {
    //   return NextResponse.json({ message: "Database already seeded" })
    // }

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);
    console.log('hashed Password',hashedPassword);

    const users = await User.create([
      {
        name: "Alex Johnson",
        email: "alex@example.com",
        password: hashedPassword,
        role: "mentor",
        image: "/placeholder.svg?height=400&width=400",
      },
      {
        name: "Sarah Williams",
        email: "sarah@example.com",
        password: hashedPassword,
        role: "mentor",
        image: "/placeholder.svg?height=400&width=400",
      },
      {
        name: "Michael Chen",
        email: "michael@example.com",
        password: hashedPassword,
        role: "mentor",
        image: "/placeholder.svg?height=400&width=400",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "user",
        image: "/placeholder.svg?height=400&width=400",
      },
    ])
    console.log('users',users);

    // Create mentor profiles
    await Mentor.create([
      {
        userId: users[0]._id,
        title: "Senior Software Engineer",
        about:
          "I'm a senior software engineer with over 10 years of experience building scalable web applications. I've worked at companies like Tech Corp and Big Tech Inc, where I led teams and mentored junior developers. I'm passionate about helping others grow in their tech careers.",
        specialties: ["React", "Node.js", "System Design", "Career Advice"],
        experience: [
          {
            company: "Tech Corp",
            role: "Senior Software Engineer",
            period: "2018 - Present",
          },
          {
            company: "Big Tech Inc",
            role: "Software Engineer",
            period: "2014 - 2018",
          },
        ],
        education: [
          {
            institution: "University of Technology",
            degree: "M.S. Computer Science",
            year: "2014",
          },
          {
            institution: "State University",
            degree: "B.S. Computer Science",
            year: "2012",
          },
        ],
        pricing: {
          chat: 50,
          video: 100,
          call: 80,
        },
        availability: [
          { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
          { day: "Wednesday", slots: ["10:00 AM - 3:00 PM"] },
          { day: "Friday", slots: ["1:00 PM - 6:00 PM"] },
        ],
        rating: 4.9,
        reviewCount: 127,
      },
      {
        userId: users[1]._id,
        title: "Product Manager",
        about:
          "I'm a product manager with experience in both startups and large tech companies. I specialize in user research, product strategy, and agile methodologies. I can help you develop your product management skills or provide guidance on your product ideas.",
        specialties: ["Product Strategy", "UX Design", "Agile", "User Research"],
        experience: [
          {
            company: "Product Co",
            role: "Senior Product Manager",
            period: "2019 - Present",
          },
          {
            company: "Startup Inc",
            role: "Product Manager",
            period: "2016 - 2019",
          },
        ],
        education: [
          {
            institution: "Business School",
            degree: "MBA",
            year: "2016",
          },
          {
            institution: "Tech University",
            degree: "B.S. Computer Science",
            year: "2013",
          },
        ],
        pricing: {
          chat: 60,
          video: 120,
          call: 90,
        },
        availability: [
          { day: "Tuesday", slots: ["10:00 AM - 2:00 PM"] },
          { day: "Thursday", slots: ["1:00 PM - 6:00 PM"] },
          { day: "Saturday", slots: ["9:00 AM - 12:00 PM"] },
        ],
        rating: 4.8,
        reviewCount: 93,
      },
      {
        userId: users[2]._id,
        title: "Data Scientist",
        about:
          "I'm a data scientist with expertise in machine learning, Python, and data analysis. I've worked on projects ranging from predictive analytics to natural language processing. I enjoy helping others understand complex data concepts and develop their skills in this field.",
        specialties: ["Machine Learning", "Python", "Data Analysis", "Statistics"],
        experience: [
          {
            company: "Data Analytics Inc",
            role: "Senior Data Scientist",
            period: "2020 - Present",
          },
          {
            company: "Research Lab",
            role: "Data Scientist",
            period: "2017 - 2020",
          },
        ],
        education: [
          {
            institution: "Science University",
            degree: "Ph.D. Statistics",
            year: "2017",
          },
          {
            institution: "Math College",
            degree: "M.S. Applied Mathematics",
            year: "2014",
          },
        ],
        pricing: {
          chat: 55,
          video: 110,
          call: 85,
        },
        availability: [
          { day: "Monday", slots: ["1:00 PM - 5:00 PM"] },
          { day: "Wednesday", slots: ["9:00 AM - 1:00 PM"] },
          { day: "Friday", slots: ["10:00 AM - 3:00 PM"] },
        ],
        rating: 4.7,
        reviewCount: 85,
      },
    ])

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

