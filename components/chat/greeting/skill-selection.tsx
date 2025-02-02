import SkillCard from "./skill-card";
import WelcomeText from "./welcome-text";

export default function SkillSelection(props:{skillField:string}) {
  return (
    <div className="grid animate-slide-up-fade grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3 xl:w-max xl:grid-cols-3 xl:gap-4">
      {props.skillField==="Speaking" && <SkillCard skill="Speaking Part 1" />}
      {props.skillField==="Speaking" && <SkillCard skill="Speaking Part 2" />}
      {props.skillField==="Speaking" && <SkillCard skill="Speaking Part 3" />}
      {props.skillField==="Writing" && <SkillCard skill="Writing Task 1" />}
      {props.skillField==="Writing" && <SkillCard skill="Writing Task 2" />}
      {props.skillField==="Pronunciation" && <SkillCard skill="Read and evaluate Pronounce" />}
      {/* {props.skillField==="" && <WelcomeText/>} */}

    </div>
  );
}
