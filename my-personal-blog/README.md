# My Personal Blog

This project is a personal blog that allows users to fill in their personal information and display blog posts. It includes a user-friendly interface for managing personal details and viewing blog content.

## Project Structure

```
my-personal-blog
├── src
│   ├── index.html          # Main HTML file for the blog
│   ├── styles              # Contains CSS files for styling
│   │   └── stylesheet.css  # Styles for the blog
│   ├── scripts             # Contains JavaScript files for functionality
│   │   ├── component.js    # Common JavaScript components
│   │   └── main.js         # Main JavaScript entry point
│   ├── components          # React components for the blog
│   │   ├── ProfileForm.js  # Component for user profile form
│   │   └── PostCard.js     # Component for displaying blog posts
│   ├── posts               # Contains blog posts in Markdown format
│   │   └── sample-post.md  # Sample blog post
│   └── data                # Contains data files
│       └── profile.json    # User profile data
├── package.json            # npm configuration file
├── .gitignore              # Files and folders to ignore in version control
└── README.md               # Project documentation
```

## Features

- **Personal Information Form**: Users can fill out their name, bio, and contact information.
- **Blog Post Display**: Users can view blog posts in a card format, showcasing the title, summary, and publication date.
- **Responsive Design**: The blog is designed to be responsive and user-friendly across devices.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-personal-blog
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

- Open `src/index.html` in a web browser to view the blog.
- Fill in the personal information form to update your profile.
- Add new blog posts in the `src/posts` directory using Markdown format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.