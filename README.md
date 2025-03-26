### **🚀 MERN Blog Platform**  
A **full-stack blog platform** built using **MongoDB, Express.js, React, and Node.js (MERN Stack)**. Users can create, read, update, and delete blog posts.  

### Live URLs
- **Frontend**: [https://your-frontend-url.vercel.app](https://mern-blog-platform-mu.vercel.app/)
- **Backend**: [[https://your-backend-url.onrender.com](https://mern-blog-app-f9au.onrender.com)]

---

## **📌 Features**  
✅ Create, Read, Update, and Delete (CRUD) blog posts  
✅ Categorize blogs and add tags  
✅ Publish or draft blog posts  
✅ RESTful API with **express-async-handler** for smooth error handling  
✅ Backend hosted on **Render** and frontend deployed on **Vercel**  

---

## **🛠 Tech Stack**  
### **Backend:**  
- **Node.js** + **Express.js**  
- **MongoDB** + **Mongoose**  
- **Winston & Morgan** (for logging)  
- **dotenv** (for environment variables)  

### **Frontend:**  
- **React.js (Next.js) + TypeScript**  
- **Tailwind CSS**  
- **React Context API** for state management  

### **Deployment:**  
- **Backend** → Render  
- **Frontend** → Vercel  
- **Database** → MongoDB Atlas  

---

## **🚀 Getting Started**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-repo/mern-blog-platform.git
cd mern-blog-platform
```

### **2️⃣ Backend Setup**  
```bash
cd backend
npm install
```
#### **Create a `.env` file in the `backend` folder**  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:  
```bash
npm start
```

### **3️⃣ Frontend Setup**  
```bash
cd frontend
npm install
npm start
```
The frontend should now be running at:  
🔗 **http://localhost:3000**  

---

## **📡 API Endpoints**  

| Method | Endpoint         | Description              |
|--------|-----------------|--------------------------|
| GET    | `/api/v1/blogs` | Fetch all blogs         |
| GET    | `/api/v1/blogs/:id` | Fetch a single blog |
| POST   | `/api/v1/blogs` | Create a new blog       |
| PUT    | `/api/v1/blogs/:id` | Update a blog       |
| DELETE | `/api/v1/blogs/:id` | Delete a blog       |

---

## **📌 Future Features (Planned)**  
🚀 User authentication (JWT)  
🚀 Commenting system  
🚀 Image uploads  
🚀 Search & Pagination  

---

## **💡 Contributing**  
1. **Fork** the repo  
2. Create a new **branch** (`git checkout -b feature-name`)  
3. **Commit** your changes (`git commit -m "Added feature"`)  
4. **Push** to your branch (`git push origin feature-name`)  
5. Open a **Pull Request**  

---

## **📜 License**  
This project is open-source and available under the **MIT License**.  


