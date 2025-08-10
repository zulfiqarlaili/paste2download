# AI Rules for Paste2Download Application

This document outlines the core technologies and libraries used in the Paste2Download application, along with guidelines for their usage.

## Tech Stack

*   **SvelteKit**: The foundational web framework for building the application.
*   **TypeScript**: The primary programming language for all Svelte components and utility files, ensuring type safety and better maintainability.
*   **Tailwind CSS**: Utilized for all styling, providing a utility-first approach for rapid and consistent UI development.
*   **shadcn/ui (Svelte)**: A collection of re-usable UI components built with Svelte and Tailwind CSS, providing a consistent design system.
*   **bits-ui**: The headless UI library that powers the `shadcn/ui` components, offering unstyled, accessible primitives.
*   **lucide-svelte**: Used for all icons throughout the application.
*   **svelte-sonner**: The chosen library for displaying elegant and accessible toast notifications.
*   **Firebase**: Integrated for user authentication, specifically handling Twitter logins.
*   **AOS (Animate On Scroll)**: Employed for scroll-triggered animations to enhance the user experience.
*   **Svelte Legos**: Provides useful Svelte utilities, such as media query helpers.

## Library Usage Rules

*   **Framework**: All new pages and components must be developed using **SvelteKit**.
*   **Language**: Always write new code and modify existing files using **TypeScript**.
*   **Styling**: Apply styling exclusively using **Tailwind CSS** classes. Avoid inline styles or separate CSS files unless absolutely necessary for specific third-party library integrations.
*   **UI Components**:
    *   Prioritize **`shadcn/ui`** components for common UI elements (e.g., buttons, inputs, dialogs, drawers).
    *   If a required `shadcn/ui` component is not available or needs significant customization, create a **new custom Svelte component**. Do not modify existing `shadcn/ui` component files directly.
    *   **`bits-ui`** should only be used as a low-level primitive for building complex, accessible UI components if `shadcn/ui` does not offer a suitable solution.
*   **Icons**: All icons should be sourced from **`lucide-svelte`**.
*   **Toasts**: Implement all user notifications and feedback using **`svelte-sonner`**.
*   **Animations**: Use **AOS** for scroll-triggered animations.
*   **Authentication**: **Firebase** is the designated service for all user authentication processes.
*   **Utilities**: Leverage **`svelte-legos`** for common Svelte-specific utilities (e.g., `mediaQuery`).
*   **Routing**: Utilize SvelteKit's built-in routing system (`$app/navigation`, `$app/stores`) for all navigation.
*   **API Calls**: All interactions with the backend API should be handled through the existing `src/lib/api.ts` service.
*   **File Structure**: Adhere to the established file structure: `src/pages/` for pages, `src/components/` for general components, `src/lib/components/ui/` for `shadcn/ui` components, and `src/lib/` for utilities and API services.