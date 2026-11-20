import Vite from '@icons/vite-svgrepo-com.svg?react';
import Tailwind from '@icons/tailwind-svgrepo-com.svg?react';
import ReactRouter from '@icons/react-router-svgrepo-com.svg?react';
import ReactHookForm from '@icons/react-hook-form-logo-only.svg?react';
import Zod from '@icons/Zod-Logo-Colored.png';

type Tech = { id: string; name: string; icon: React.ReactNode };

const technologies: Tech[] = [
  { id: 'vite', name: 'Vite', icon: <Vite /> },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <Tailwind /> },
  { id: 'react-router', name: 'React Router', icon: <ReactRouter /> },
  { id: 'react-hook-form', name: 'React Hook Form', icon: <ReactHookForm /> },
  { id: 'zod', name: 'Zod', icon: <img src={Zod} alt="zod library logo" /> },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="flex flex-col gap-2 pt-2">
      <h2 className="text-center text-2xl font-semibold text-shadow-md">
        Technologies Employed
      </h2>

      {/* TODO: add animation of vertical shift plus name or enlarge icon and surrounding icons by half plus add the name */}
      <ul className="flex items-center gap-x-2 bg-menu px-4 py-2">
        {technologies.map(({ id, name, icon }) => (
          <li
            key={id}
            aria-label={name}
            aria-describedby={id}
            className="relative size-12 group hover:bg-gray-500"
          >
            <span className='*:size-full *:object-contain'>{icon}</span>
            <div
              id={id}
              role="tooltip"
              className="absolute bottom-full mb-2 hidden rounded bg-gray-900 px-2 py-1 text-xs text-text-main group-focus-within:block group-hover:block"
            >
              {name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TechStack;
