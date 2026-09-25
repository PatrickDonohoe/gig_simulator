import Vite from '@icons/vite-svgrepo-com.svg?react';
import Tailwind from '@icons/tailwind-svgrepo-com.svg?react';
import ReactRouter from '@icons/react-router-svgrepo-com.svg?react';
import ReactHookForm from '@icons/react-hook-form-logo-only.svg?react';
import Zod from '@icons/Zod-Logo-Colored.png';

type Tech = { name: string; icon: React.ReactNode };

const technologies: Tech[] = [
  { name: 'Vite', icon: <Vite /> },
  { name: 'Tailwind CSS', icon: <Tailwind /> },
  { name: 'React Router', icon: <ReactRouter /> },
  { name: 'React Hook Form', icon: <ReactHookForm /> },
  { name: 'Zod', icon: <img src={Zod} alt="zod library logo" /> },
];

const TechStack = () => {
  return (
    <section className="flex flex-col">
      <h2 className="text-center text-2xl font-semibold text-shadow-md">
        Technologies Employed
      </h2>

      {/* TODO: add animation of vertical shift plus name or enlarge icon and surrounding icons by half plus add the name */}
      <ul className="flex items-center">
        {technologies.map(({ name, icon }) => (
          <li
            key={name}
            aria-label={name}
            className="size-12 *:size-full *:object-contain"
          >
            {icon}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TechStack;
