# Nord Health Signup Application

A modern, responsive signup form built with Nuxt 3, TypeScript, and Nord Health Design components.

## Features

- **Clean, Modern UI**: Built with Nord Health Design components following their design guidelines
- **Form Validation**: Robust validation with clear error messages
- **Password Visibility Toggle**: Users can show/hide their password
- **Email Updates Opt-in**: Optional checkbox for product updates and announcements  
- **Success Flow**: Dedicated success page after signup completion
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on all device sizes

## Tech Stack

- **Nuxt 3** - Full-stack framework
- **TypeScript** - Type safety
- **Nord Health Components** - Design system components
- **Vue 3 Composition API** - Modern reactive state management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/
│   ├── SignupForm.vue      # Main signup form component
│   └── SuccessPage.vue     # Success confirmation page
├── utils/
│   └── validation.ts       # Form validation logic
├── plugins/
│   └── nord-components.client.ts  # Nord Health components setup
└── app.vue                 # Main application layout
```

## Form Validation

The application includes comprehensive validation:

- **Email**: Required, must be valid email format
- **Password**: Required, minimum 8 characters
- **Real-time validation**: Errors clear as user types
- **Submit validation**: Final validation before form submission

## Design Guidelines

Following Nord Health Design principles:
- Consistent spacing and typography
- Accessible color contrast
- Clear visual hierarchy
- Intuitive user interactions
- Mobile-first responsive design

## Build

```bash
npm run build
```

## Deploy

```bash
npm run preview
```
