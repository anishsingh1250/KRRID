import React from 'react';

const levels = [
  {
    title: 'Beginner',
    level: 'Level 1',
    suited: 'Perfect for anyone new to chess who has a keen interest and enthusiasm to learn the game from scratch. No prior knowledge required!',
    takeaways: 'Nature of the game, Square names, Movement of Chessmen, Special moves, Check, Checkmate, Attack, Capturing Pieces, Stalemate, Defence, Exchange, Draw, Basic Strategies',
    outcome: 'By the end of the beginner level, students will confidently step into the chessboard arena, mastering international rules and unleashing powerful strategies to elevate their game and outsmart their opponents!',
    description: 'Ready to dive into the world of chess? This level is tailor-made for beginners! At Krrid, we\'ve crafted an engaging program for students aged 4 and up, ensuring you build a solid foundation and embark on your chess adventure with confidence and excitement!'
  },
  {
    title: 'Beginner',
    level: 'Level 2',
    suited: 'Designed for students who have completed the Beginner level at Krrid or those with equivalent knowledge.',
    takeaways: 'Mate in one positions, Basic Checkmates with Queen and 2 Rooks, Basic Opening principles, How to write a game, Tactics (Easy) – Double attack, Knight Fork, Skewer, Back Rank & Pin, Mate in two positions, Destroying the defender, Distracting the defender, Discovered attack & Check, Mixed motifs',
    outcome: 'By the end of the Advanced Beginner level, students will have a solid grasp of basic tactics and opening strategies. This level focuses on theory and practical skills, preparing students to confidently challenge and defeat amateur players in competitive games.',
    description: 'This level covers powerful tactics and solid openings through engaging coaching that mixes theory with real-game practice. Our expert coaches provide a personalized weekly study plan, homework, and tests to track your progress.'
  },
  {
    title: 'Intermediate',
    level: '',
    suited: 'Perfect for students who have completed the Next-Level Beginner at Krrid or have equivalent knowledge.',
    takeaways: 'Basic King and Pawn endgames, Berger\'s "Rule of the square", Openings (development of pieces), Tactics (Normal) – Double attack, Knight Fork, Skewer, Back Rank, Pin, Destroying the defender, Deflection, Discovered attack & check, 1 Rook Checkmate, Queen vs pawn on 7th Rank, Defending against checkmate, Mixed motifs',
    outcome: 'By the end of the Intermediate level, students will have a solid understanding of endgames, an introduction to opening theory, and a deeper grasp of tactics. They\'ll be ready to take on the Advanced level and master more complex tactics!',
    description: 'After mastering the basics, students will dive deeper into endgame strategies and opening theory at Krrid. With plenty of practice in coaching sessions, they\'ll refine their skills and gain a stronger grasp on the game.'
  },
  {
    title: 'Advanced',
    level: 'Level 1',
    suited: 'Ideal for students who have completed the Intermediate level at Krrid or possess equivalent knowledge.',
    takeaways: 'Mate in 3, forced moves, smothered mate, wind mill, X-ray attack, line opening, line closing, positional strengths of pieces, pawn structure, Imbalance Concepts, Overloaded Pieces, Square Vacation, Combination & Calculation, Two Bishops Checkmate, The Wrong Square Bishop.',
    outcome: 'By the end of Advanced, students will be equipped to apply Advanced tactics confidently and elevate their game to a higher level.',
    description: 'The Advanced Level at Krrid aims to elevate students to a semi-professional standard by deepening their understanding of Advanced tactics and endgame theory. With a strong tactical foundation, students will also explore positional play in the middle game.'
  },
  {
    title: 'Advanced',
    level: 'Level 2',
    suited: 'For students who have completed Advanced Level Part 1 at Krrid or have equivalent knowledge.',
    takeaways: 'Instructive short games, Pawn endgames, Mating motifs, Positional weakness, Gambits in the opening, Master games of world champions',
    outcome: 'By the end of Advanced Level Part 2, students will have completed all 5 foundational levels and will be well-versed in the fundamentals of chess. They will be able to understand and apply strategies used by world chess champions.',
    description: 'The Advanced Level Part 2 is designed to refine your chess skills and bring you closer to a semi-professional level. This course dives deeper into Advanced tactics, endgame concepts, and positional play. You\'ll also study classic games from world champions, with detailed analysis to uncover the strategies that elevate their play.'
  }
];

const classTypes = [
  {
    title: 'One-on-one Class',
    desc: 'Get the coach\'s complete focus with guidance made just for you!',
    features: ['Personalized Learning', 'Flexible Scheduling', 'Immediate Feedback', 'Accelerated Progress']
  },
  {
    title: 'Focused Group Class',
    desc: 'A small, interactive group of kids. Focuses on practice and regular analysis in a small group.',
    features: ['Collaborative Learning', 'Social Interaction', 'Enhanced Motivation', 'Cost-Effectiveness']
  }
];

export default function CoursesCurriculumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-200 flex flex-col items-center justify-center p-8">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-4xl w-full mb-8">
        <h1 className="text-5xl font-heading font-bold text-purple-800 mb-6 text-center">Our Courses & Curriculum</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">At Krrid, we provide a curriculum meticulously crafted based on scientific principles, encompassing five essential levels. By the conclusion of Level 1, students will have exceeded the chess proficiency of many casual adult players, thereby establishing a robust foundation and a competitive advantage.</p>
        <div className="grid gap-8 mb-10">
          {levels.map((lvl, idx) => (
            <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-1">{lvl.title} <span className="text-lg text-blue-400">{lvl.level}</span></h2>
              <p className="text-sm text-gray-600 mb-2"><span className="font-semibold text-blue-600">Best suited for:</span> {lvl.suited}</p>
              <p className="text-sm text-gray-600 mb-2"><span className="font-semibold text-blue-600">Key Takeaways:</span> {lvl.takeaways}</p>
              <p className="text-sm text-gray-600 mb-2"><span className="font-semibold text-blue-600">Outcome:</span> {lvl.outcome}</p>
              <p className="text-sm text-gray-700 mb-2">{lvl.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Our Classes</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {classTypes.map((ct, idx) => (
            <div key={idx} className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-2">{ct.title}</h3>
              <p className="text-gray-700 mb-2">{ct.desc}</p>
              <ul className="list-disc list-inside text-gray-600">
                {ct.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">Be a part of Krrid today!</h2>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Book Free Demo</button>
        </div>
      </section>
    </main>
  );
} 