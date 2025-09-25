import React from "react";
import { InlineCode } from "@/app/components/ui/inline-code";
import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getListClass,
  getAllowanceClass,
  getPageAllowanceClass,
} from "@/utils/typography";
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { TransitionLink } from "@/app/components/PageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Materials",
  description: "Mildly creative, chaotically inquisitive",

  alternates: {
    canonical: "/learning/materials",
  },

  openGraph: {
    title: "Learning Materials - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    url: "https://obukofejoseph.com/learning/materials",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/thumbnails/materials.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Learning Materials - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/materials.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    "max-snippet": 200,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 200,
    },
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Learning Materials",
      description: "Mildly creative, chaotically inquisitive",
      url: "https://obukofejoseph.com/learning/materials",
      author: {
        "@type": "Person",
        name: "Obukofe Joseph",
        alternateName: "Obukofe Joe",
        url: "https://obukofejoseph.com",
        image: "https://obukofejoseph.com/images/thumbnails/materials.png",
        sameAs: ["https://twitter.com/obukofejoe"],
      },
    }),
  },
};

export default function MaterialsPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: false,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Learning Materials
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        A very-much growing collection of resources and reference materials that
        I’m using to make sense of everything I’m learning. Some of these are
        go-to textbooks, and others are mainly YouTube stuff I keep revisiting.
        I update this space regularly as I explore new content or stumble on
        something that just clicks, so it's more or less a very personal (and
        random) library of stuff I’m learning, unlearning, and bookmarking along
        the way.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        While I mostly learn most stuff on the fly and oscillate between
        extremely random resources, I do have a few go-to resources that helps
        me solidify what I've learned, which is mainly what you'd find here.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Machine Learning
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This is where most of the action happens (or where most of my brain
        cells go to die if you'd prefer to put it that way), and I’m aiming to
        build a really solid foundation in machine learning by blending
        structured learning (books and courses) with more flexible,
        curiosity-driven exploration (videos, blogs, research papers, and
        reference docs). I occasionally breeze through stuff for more specific
        (and in-depth) concepts and stuff I find hard to understand, and while I
        don’t necessarily stick to go-to resources for these, I mostly tend to
        hop around random but correlated stuff, and basically anything that
        helps the ideas “click”. Still, I have a list of go-to and somewhat
        timeless resources, and they’ve really helped me understand the ins and
        outs of ML as a whole.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Books</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        To me, these are more than just theory dumps, and they help me
        understand the how and why behind real-world ML workflows and processes.
        Some of my core reads so far:
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow by
            Aurélien Géron
          </i>
          . This is my first ever encounter with ML away from any formal
          education, and video contents. where I started to get a solid
          foundation in machine learning, with mostly theoretical content, but
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Designing Machine Learning Systems by Chip Huyen
          </i>{" "}
          — an eye-opener for thinking about ML as a product and a system, not
          just a model.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Machine Learning Design Patterns by Valliappa Lakshmanan, Sara
            Robinson & Michael Munn
          </i>{" "}
          — full of practical, reusable approaches to recurring ML engineering
          problems.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Rules of Machine Learning: Best Practices for ML Engineering (Martin
            Zinkevich, 2019)
          </i>{" "}
          — ...
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            The ML Test Score: A Rubric for ML Production Readiness and
            Technical Debt Reduction by Eric Breck, Shanqing Cai, Eric Nielsen,
            Michael Salib & D. Sculley
          </i>{" "}
          — ...
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Courses</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’m currently learning through a mix of beginner-friendly and
        systems-focused ML courses, and they complement the books and help me
        connect the dots between theory and practice. Here are a few I’m
        currently working through or have lined up:
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Fast.ai’s Practical Deep Learning for Coders
          </i>{" "}
          – an intuitive, top-down approach that gets you building models right
          away.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Andrew Ng’s Machine Learning on Coursera
          </i>{" "}
          – the classic, foundational course that covers supervised learning
          basics with just the right dose of math.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            CS50’s Introduction to AI with Python
          </i>{" "}
          – good for understanding core AI concepts while getting your hands
          dirty with actual implementation.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Machine Learning Engineering for Production (MLOps) by
            DeepLearning.AI
          </i>
          – really useful for bridging the gap between models and real-world ML
          systems.
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        YouTube & Quick References
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        YouTube is my go-to whenever I need something explained, rather than to
        read it. Reading requires much more concentration than I can
        realistically commit to, and honestly, I have the attention-span of a
        goldfish at times, plus I get distracted so easily it’s basically a
        superpower at this point. While I mostly binge through random but
        correlated stuff, I particularly go through these more often than
        others:
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Cornell CS4780: Machine Learning for Intelligent Systems
          </i>{" "}
          – a university-level lecture series that goes in-depth but still stays
          digestible.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            AI, But Simple
          </i>{" "}
          – my go-to YouTube channel for quick explanations, refreshing
          fundamentals, and getting unstuck when I need a reset or a new
          perspective.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">3Blue1Brown</i>{" "}
          – ...
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            StatQuest with Josh Starmer
          </i>
          – ...
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Deep Learning & Neural Networks
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This section covers the resources helping me build both an intuitive and
        technical understanding of deep learning, from the basics of neural
        networks to more advanced concepts like generative models. The books
        outlined here helps make deep learning feel less intimidating, and
        honestly, they’ve done wonders for how I'm currently grasping neural
        networks.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Books</h3>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Deep Learning for Coders with fastai & PyTorch by Jeremy Howard &
            Sylvain Gugger
          </i>{" "}
          — a top-down, code-first approach that’s friendly for beginners but
          packed with insight. It teaches concepts through real-world problems,
          not dry theory.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            The Little Book of Deep Learning by François Fleuret
          </i>{" "}
          — a concise, well-written guide that’s perfect for quick mental
          refreshers or clarifying tricky concepts. Great as a companion to
          heavier material.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Grokking Deep Learning by Andrew W. Trask
          </i>
          – ...
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Information Theory, Inference, and Learning Algorithms by David J.C.
            Mackay
          </i>
          – ...
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Courses</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        ...
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            MIT’s Introduction to Deep Learning (6.S191)
          </i>
          . It’s a pretty fast-paced course that covers everything from the
          building blocks of neural networks to cutting-edge topics like
          transformers and generative models.
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>YouTube</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        When I need a visual explanation or a more intuitive take on NN's and
        DL, these channels come in clutch:
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Introduction to Deep Learning and Generative Models by Sebastian
            Raschka
          </i>
          . Super clear explanations, especially around training dynamics and
          model design choices.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Neural Networks by 3Blue1Brown
          </i>
          . More or less a visual masterpiece, and while I struggled with how a
          neural net "learns", this helped me out a lot.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Neural Networks: Zero to Hero by Andrej Karpathy
          </i>
          . This is easily one of the most engaging series out there for
          understanding deep learning from the ground up.
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Math</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’ll be brutally honest, the math behind deep learning felt like a
        jungle at first, but I’m taking it one step at a time. I’m not trying to
        master it all at once, but just to build a strong enough base to
        understand what I’m doing and why it works. Right now, I’m focusing on
        (and not limited to):
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          Linear algebra, especially matrix operations, dot products, and
          eigenvectors.
        </li>
        <li>Combinatorics and set theory.</li>
        <li>
          Calculus, particularly derivatives and gradients, since they power
          backpropagation in NN's.
        </li>
        <li>
          Probability and statistics, which help me reason more intuitively
          about uncertainty, loss functions, and model evaluation.
        </li>
      </ul>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        For resources, I bounce between:
      </p>
      <ul
        className={getListClass({
          responsive: true,
          muted: true,
          padded: true,
        })}
      >
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">Khan Academy</i>{" "}
          – for slow, steady refreshers.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Essence of Linear Algebra by 3Blue1Brown
          </i>{" "}
          – for deep intuition.
        </li>
        <li>
          <i className="text-neutral-800 dark:text-neutral-200">
            Mathematics for Machine Learning by Deisenroth et al.
          </i>{" "}
          – for tying the math directly to ML concepts.
        </li>
      </ul>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Rust</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’m approaching Rust as a low-pressure, curiosity-fueled side quest (aka
        me convincing myself this is still "just for fun" while the compiler
        gaslights me daily), and I'm not trying to rush into systems-level
        programming yet, but just taking the time to explore and build
        confidence as I go. Right now, I’m primarilty focused on understanding
        the syntax, core concepts like ownership and borrowing, and just getting
        used to the language’s mental model. I’m treating it like a second
        language I want to eventually speak fluently, but for now, I’m happy
        stringing sentences together and making sense of the grammar.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        My main guide on this journey is{" "}
        <TransitionLink
          href="https://doc.rust-lang.org/book/"
          className="text-neutral-800 dark:text-neutral-200"
        >
          <UnderlineLink>The Rust Book</UnderlineLink>
        </TransitionLink>
        . It’s thorough and really well-written, and I especially appreciate how
        it explains why things work the way they do.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Rust would definitely become a bigger part of my workflow someday,
        especially for building fast and efficient tools. For now, it's just me,
        the compiler, and a growing list of <InlineCode>cargo run</InlineCode>{" "}
        experiments.
      </p>
      <div className={getAllowanceClass({ axis: "py" })}></div>
      <h3 className={getHeadingClass(3, { responsive: true })}>Note Taking</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        For most of my note-taking tasks, I primarily use{" "}
        <UnderlineLink>
          <TransitionLink
            href="https://www.notion.so/"
            className="text-neutral-800 dark:text-neutral-200"
          >
            Notion
          </TransitionLink>
        </UnderlineLink>
        . It’s more or less my second brain, which is wild because my first
        brain can barely keep track of what someone told me in the last 5
        minutes, and most of my thoughts, write-ups and case studies are all
        done on there. I am currently updating my glossary on it and I’m super
        stoked to show it here when the finishing touches are applied. In the
        meantime, little chunks of materials from the glossary would be shared
        here in the{" "}
        <TransitionLink
          href="/learning/recap"
          className="text-neutral-800 dark:text-neutral-200"
        >
          <UnderlineLink>weekly recap</UnderlineLink>
        </TransitionLink>{" "}
        sessions to crystallize my learning bits.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I recently started using{" "}
        <UnderlineLink>
          <TransitionLink
            href="https://obsidian.md/"
            className="text-neutral-800 dark:text-neutral-200"
          >
            Obsidian
          </TransitionLink>
        </UnderlineLink>{" "}
        and found out how cool it was with the extremely customizable options to
        make it a really personalized experience, rich markdown support, a graph
        view that seamlessly connects different notes together creating some
        sort of a mind map, and the wide array of custom community plugins. I
        also really dig the idea of the self-managed Obsidian vaults and I think
        it’s a great way to prioritize user privacy. Like{" "}
        <UnderlineLink>
          <TransitionLink
            href="https://www.notion.so/"
            className="text-neutral-800 dark:text-neutral-200"
          >
            Notion
          </TransitionLink>
        </UnderlineLink>
        , I love that it has support for LaTeX and code blocks which are super
        essential to my learning.{" "}
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I’m still getting the hang of it and it might be my new second brain,
        who knows :-){" "}
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        For miscellaneous and on-the-fly stuff, I use{" "}
        <TransitionLink
          href="https://www.icloud.com/notes/"
          className="text-neutral-800 dark:text-neutral-200"
        >
          <UnderlineLink>Apple Notes</UnderlineLink>
        </TransitionLink>{" "}
        which can be really convenient especially when I don’t have a specific
        note structure in mind or for random inspirations or even for basic
        to-dos.{" "}
      </p>
      <div className="py-5"></div>
    </section>
  );
}
