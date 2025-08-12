import React from "react";
import { InlineCode } from "@/app/components/ui/inline-code";
import { UnderlineLink } from "@/app/components/ui/underline-link";

export default function MaterialsPage() {
  return (
    <section className="space-y-6 mb-32">
      <h1 className="text-[1.1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200">
        Learning Materials
      </h1>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        A growing collection of resources, personal notes, and reference
        materials that I’m using to make sense of everything I’m learning. Some
        of these are go-to textbooks, others are YouTube gems or courses I keep
        revisiting. I update this space regularly as I explore new content or
        stumble on something that just clicks. Think of it as my personal living
        library of things I’m learning, unlearning, and bookmarking along the
        way.
      </p>

      <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Machine Learning
      </h2>

      <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        This is where most of the action happens. I’m aiming to build a really
        solid foundation in machine learning by blending structured learning
        (books and courses) with more flexible, curiosity-driven exploration
        (videos, blogs, research papers, and reference docs).
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’m especially drawn to understanding how ML systems work in the real
        world — not just the algorithms themselves, but how data flows, how
        models are trained, evaluated, deployed, and monitored. It’s kind of a
        mix of theory, tooling, and architecture.
      </p>

      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Books
      </h3>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Some of my core reads so far:
      </p>
      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <i>Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow</i>{" "}
          by Aurélien Géron — great for building intuition and jumping straight
          into projects.
        </li>
        <li>
          <i>Designing Machine Learning Systems</i> by Chip Huyen — an
          eye-opener for thinking about ML as a product and a system, not just a
          model.
        </li>
        <li>
          <i>Machine Learning Design Patterns</i> by Valliappa Lakshmanan, Sara
          Robinson & Michael Munn — full of practical, reusable approaches to
          recurring ML engineering problems.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        These books are more than just theory dumps, and they’re helping me
        understand the how and why behind real-world ML workflows.
      </p>
      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Courses
      </h3>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’m currently learning through a mix of beginner-friendly and
        systems-focused ML courses. Here are a few I’m currently working through
        or have lined up:
      </p>
      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>Fast.ai’s Practical Deep Learning for Coders</b> – an intuitive,
          top-down approach that gets you building models right away.
        </li>
        <li>
          <b>Andrew Ng’s Machine Learning on Coursera</b> – the classic,
          foundational course that covers supervised learning basics with just
          the right dose of math.
        </li>
        <li>
          <b>CS50’s Introduction to AI with Python</b> – good for understanding
          core AI concepts while getting your hands dirty with actual
          implementation.
        </li>
        <li>
          <b>
            Machine Learning Engineering for Production (MLOps) by
            DeepLearning.AI
          </b>
          – really useful for bridging the gap between models and real-world ML
          systems.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        These courses complement the books and are helping me connect the dots
        between theory and practice.
      </p>

      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        YouTube & Quick References
      </h3>

      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>Cornell CS4780: Machine Learning for Intelligent Systems</b> – a
          university-level lecture series that goes in-depth but still stays
          digestible.
        </li>
        <li>
          <b>AI, But Simple</b> – my go-to YouTube channel for quick
          explanations, refreshing fundamentals, and getting unstuck when I need
          a reset or a new perspective.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I really love using YouTube for when I want to see something explained
        rather than read it.
      </p>

      <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Deep Learning & Neural Networks
      </h2>

      <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        This section covers the resources helping me build both an intuitive and
        technical understanding of deep learning — from the basics of neural
        networks to more advanced concepts like generative models.
      </p>

      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Books
      </h3>

      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>Deep Learning for Coders with fastai & PyTorch</b> by Jeremy Howard
          & Sylvain Gugger — a top-down, code-first approach that’s friendly for
          beginners but packed with insight. It teaches concepts through
          real-world problems, not dry theory.
        </li>
        <li>
          <b>The Little Book of Deep Learning</b> by François Fleuret — a
          concise, well-written guide that’s perfect for quick mental refreshers
          or clarifying tricky concepts. Great as a companion to heavier
          material.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Both books focus on making deep learning feel less intimidating — and
        honestly, they’ve done wonders for how I'm currently grasping neural
        networks.
      </p>

      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Courses
      </h3>

      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>MIT’s Introduction to Deep Learning (6.S191)</b> It’s a fast-paced
          course that covers everything from the building blocks of neural
          networks to cutting-edge topics like transformers and generative
          models.
        </li>
      </ul>

      <h3 className="text-[1rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        YouTube
      </h3>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        When I need a visual explanation or a more intuitive take, these
        channels are clutch:
      </p>
      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>Introduction to Deep Learning and Generative Models</b> – by
          Sebastian Raschka super clear explanations, especially around training
          dynamics and model design choices.
        </li>
        <li>
          <b>Neural Networks by 3Blue1Brown</b> – a visual masterpiece. If
          you’ve ever struggled to understand how a neural net “learns”, this is
          the video series you want.
        </li>
        <li>
          <b>Neural Networks: Zero to Hero</b> – by Andrej Karpathy easily one
          of the most engaging series for understanding deep learning from the
          ground up, with hands-on implementation and Karpathy’s signature
          storytelling style.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        These videos help turn abstract ideas into mental models I can actually
        work with.
      </p>

      <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Math
      </h2>
      <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’ll be totally honest, the math behind deep learning felt like a jungle
        at first. But I’m taking it one step at a time. Right now, I’m focusing
        on:
      </p>

      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          Linear algebra, especially matrix operations, dot products, and
          eigenvectors.
        </li>
        <li>Combinatorics and set theory.</li>
        <li>
          Calculus, particularly derivatives and gradients, since they power
          backpropagation.
        </li>
        <li>
          Probability and statistics, which help me reason about uncertainty,
          loss functions, and model evaluation.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        For resources, I bounce between:
      </p>

      <ul className="list-disc pl-6 font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200 space-y-1">
        <li>
          <b>Khan Academy</b> – for slow, steady refreshers.
        </li>
        <li>
          <b>Essence of Linear Algebra</b> by 3Blue1Brown – for deep intuition.
        </li>
        <li>
          <b>Mathematics for Machine Learning</b> by Deisenroth et al. – for
          tying the math directly to ML concepts.
        </li>
      </ul>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’m not trying to master it all at once — just building a strong enough
        base to understand what I’m doing and why it works.
      </p>

      <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Rust
      </h2>
      <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’m approaching Rust as a low-pressure, curiosity-fueled side quest —
        not trying to rush into systems-level programming, just taking the time
        to explore and build confidence as I go.
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Right now, I’m focused on understanding the syntax, core concepts like
        ownership and borrowing, and just getting used to the language’s mental
        model. I’m treating it like a second language I want to eventually speak
        fluently — but for now, I’m happy stringing sentences together and
        making sense of the grammar.
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        My main guide on this journey is{" "}
        <UnderlineLink href="https://doc.rust-lang.org/book/">
          The Rust Book
        </UnderlineLink>{" "}
        — it’s thorough, beginner-friendly, and really well-written. I
        especially appreciate how it explains why things work the way they do,
        not just how.
      </p>

      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        Rust would become a bigger part of my workflow someday, especially for
        building fast and efficient tools. For now, it's just me, the compiler,
        and a growing list of <InlineCode>cargo run</InlineCode> experiments.
      </p>

      <h2 className="text-[1.05rem] font-semibold font-borna text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        Note Taking
      </h2>
      <hr className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        For most of my note-taking tasks, I primarily use{" "}
        <UnderlineLink href="https://www.notion.so/">Notion</UnderlineLink>.
        It’s more or less my second brain and most of my thoughts, write-ups and
        case studies are all done on there. I am currently updating my glossary
        on it and I’m super stoked to show it here when the finishing touches
        are applied. In the meantime, little chunks of material from the
        glossary would be shared here in the{" "}
        <UnderlineLink href="/learning/recap" target="_self">
          weekly recap
        </UnderlineLink>{" "}
        sessions to crystallize my learning bits.
      </p>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I recently started using{" "}
        <UnderlineLink href="https://obsidian.md/">Obsidian</UnderlineLink> and
        found out how cool it was with the extremely customizable options to
        make it a really personalized experience, rich markdown support, a graph
        view that seamlessly connects different notes together creating some
        sort of a mind map, and the wide array of custom community plugins. I
        also really dig the idea of the self-managed Obsidian vaults and I think
        it’s a great way to prioritize user privacy. Like{" "}
        <UnderlineLink href="https://www.notion.so/">Notion</UnderlineLink>, I
        love that it has support for LaTeX and code blocks which is super
        essential to my learning.{" "}
      </p>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        I’m still getting the hang of it and it might be my new second brain,
        who knows ; ){" "}
      </p>
      <p className="font-satoshi text-[0.90rem] text-neutral-800 dark:text-neutral-200">
        For miscellaneous and on-the-fly stuff, I use{" "}
        <UnderlineLink href="https://www.icloud.com/notes/">
          Apple Notes
        </UnderlineLink>{" "}
        which can be really convenient especially when I don’t have a specific
        note structure in mind or for random inspirations or even for basic
        to-dos.{" "}
      </p>
      <div className="py-5"></div>
    </section>
  );
}
