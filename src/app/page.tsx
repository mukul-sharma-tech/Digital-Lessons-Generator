// // // app/page.tsx

// import { createClient } from "@/utils/supabase/server";
// import LessonForm from "@/app/components/LessonForm";
// import LessonsTable from "@/app/components/LessonsTable";
// import { Database } from "./types_db";

// export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

// export default async function Home() {
//   const supabase = await createClient();

//   const { data: lessons, error } = await supabase
//     .from("lessons")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) console.error("Error fetching lessons:", error);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-gray-800">
//       <div className="w-full max-w-4xl mx-auto p-6 md:p-10">
//         <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center">
//           🌸 Digital Lessons Generator
//         </h1>

//         <div className="mb-10">
//           <LessonForm />
//         </div>

//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-indigo-100">
//           <LessonsTable initialLessons={lessons || []} />
//         </div>
//       </div>
//     </main>
//   );
// }



import { createClient } from "@/utils/supabase/server";
import LessonForm from "@/app/components/LessonForm";
import LessonsTable from "@/app/components/LessonsTable";
import ThreeBackground from "@/app/components/ThreeBackground"; // 👈 import added
import { Database } from "./types_db";

export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export default async function Home() {
  const supabase = await createClient();

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching lessons:", error);

  return (
    <main className="relative min-h-screen bg-transparent text-gray-800 overflow-hidden">
      <ThreeBackground /> {/* 👈 your 3D background */}

      <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center drop-shadow-md">
          🌸 Digital Lessons Generator
        </h1>

        <div className="mb-10">
          <LessonForm />
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-indigo-100">
          <LessonsTable initialLessons={lessons || []} />
        </div>
      </div>
    </main>
  );
}
