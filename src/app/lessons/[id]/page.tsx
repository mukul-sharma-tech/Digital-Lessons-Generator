// // app/lessons/[id]/page.tsx

// import { createClient } from "@/utils/supabase/server";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import LessonRenderer from "@/app/components/LessonRenderer";
// import { ArrowLeft, Loader2, XCircle, CheckCircle } from "lucide-react"; // 👈 Lucide icons

// type LessonPageProps = {
//   params: {
//     id: string;
//   };
// };

// export default async function LessonPage({ params }: LessonPageProps) {
  
//   const { id } = await params;

//   const supabase = await createClient();

//   // This code will now work because 'supabase' is the real client.
//   const { data: lesson } = await supabase
//     .from("lessons")
//     .select("*")
//     .eq("id", id) // Use the 'id' variable
//     .single();

//   if (!lesson) {
//     notFound();
//   }
// function toSentenceCase(text: string) {
//   if (!text) return "";
//   const lower = text.toLowerCase();
//   return lower.charAt(0).toUpperCase() + lower.slice(1);
// }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-10">
//       <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/10 p-8">
        
//         {/* Back Link */}
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition mb-6"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to all lessons
//         </Link>

//         {/* Lesson Title */}
//         <h1 className="text-4xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text">
//           {toSentenceCase(lesson.outline)}
//         </h1>

//         {/* Lesson Status */}
//         <div>
//           {lesson.status === "generating" && (
//             <div className="flex items-center gap-3 border border-yellow-400/30 bg-yellow-400/10 rounded-lg p-6 text-yellow-200">
//               <Loader2 className="animate-spin w-5 h-5" />
//               <span>Lesson is still generating...</span>
//             </div>
//           )}

//           {lesson.status === "failed" && (
//             <div className="flex items-center gap-3 border border-red-400/30 bg-red-400/10 rounded-lg p-6 text-red-200">
//               <XCircle className="w-5 h-5" />
//               <span>Lesson failed to generate. Check Inngest logs for details.</span>
//             </div>
//           )}

//           {lesson.status === "generated" && (
//             <div className="prose prose-invert prose-pre:bg-slate-900 prose-headings:text-cyan-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none">
//               <LessonRenderer code={lesson.content || ""} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// app/lessons/[id]/page.tsx

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonRenderer from "@/app/components/LessonRenderer";
import { ArrowLeft, Loader2, XCircle } from "lucide-react";
import ThreeBackground from "@/app/components/ThreeBackground"; // 👈 Import added

type LessonPageProps = {
  params: {
    id: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (!lesson) notFound();

  function toSentenceCase(text: string) {
    if (!text) return "";
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* --- 3D SPACE BACKGROUND --- */}
      <ThreeBackground />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 px-6 py-10">
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/10 p-8">
          {/* Back Link */}
<Link
  href="/"
  className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-400 transition mb-6"
>
  <ArrowLeft className="w-5 h-5" />
  Back to all lessons
</Link>

          {/* Lesson Title */}
<h1 className="text-4xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-900 via-indigo-700 to-cyan-600 text-transparent bg-clip-text">
  {toSentenceCase(lesson.outline)}
</h1>

          {/* Lesson Status */}
          <div>
            {lesson.status === "generating" && (
              <div className="flex items-center gap-3 border border-yellow-400/30 bg-yellow-400/10 rounded-lg p-6 text-yellow-200">
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Lesson is still generating...</span>
              </div>
            )}

            {lesson.status === "failed" && (
              <div className="flex items-center gap-3 border border-red-400/30 bg-red-400/10 rounded-lg p-6 text-red-200">
                <XCircle className="w-5 h-5" />
                <span>Lesson failed to generate. Check Inngest logs for details.</span>
              </div>
            )}

            {lesson.status === "generated" && (
              <div className="prose prose-invert prose-pre:bg-slate-900 prose-headings:text-cyan-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none">
                <LessonRenderer code={lesson.content || ""} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
