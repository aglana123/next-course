# NextCourse
**[Visit NextCourse](https://next-course-klu7.vercel.app/)**

NextCourse is a web application designed to help users find and create courses related to various technology topics such as web development, mobile development, data analysis, and machine learning.

![next-course-klu7 vercel app_ (3)](https://github.com/aglana123/next-course/assets/131781656/33a355e2-d01b-48e3-8902-4f97326fc9fe)

## Features

- **Course Search:** Users can search for courses based on keywords, topics, or categories.
- **Course Creation:** Registered users can create new courses, providing details such as title, description, prerequisites, and duration.
- **Private Course:** Users can create private courses with restricted access. Only users with authorized access can view and participate in these courses.
- **User Authentication:** Authentication system for users to register, login, and manage their profiles powered by Next Auth.
- **Bookmarking/Wishlist:** Users can bookmark courses they are interested in for future reference.
- **Responsive Design:** The website is responsive and works seamlessly across various devices and screen sizes.

## Technologies Used

- **Frontend:** Next.js, React.js, Tailwind CSS, shadcn/ui (UI Components)
- **Backend:** Node.js, Next.js API routes, Prisma ORM, CockroachDB/PostgreSQL
- **Authentication:** Next Auth (OAuth authentication for Next.js)
- **File Uploads:** uploadthing
- **Streaming:** React-player

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
    ```bash
    git clone https://github.com/aglana123/next-course.git
    ```
    
2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   
4. Set up environment variables. Create a `.env` file in the root directory of the project and add the following variables:
    ```plaintext
    DATABASE_URL=your_database_url
    DB_PASSWORD=your_database_password
    UPLOADTHING_SECRET=your_uploadthing_secret
    UPLOADTHING_APP_ID=your_uploadthing_app_id
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=your_nextauth_url
    NEXT_PUBLIC_APP_URL=your_next_public_app_url
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

5. Run the development server.
    ```bash
    npm run dev
    ```

6. Access the application by visiting `http://localhost:3000` in your web browser.

## Contributing

Contributions are welcome! If you have any ideas for new features, find any bugs, or would like to contribute in any other way, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to contact us at [hilalbagas@gmail.com](mailto:hilalbagas@gmail.com).


