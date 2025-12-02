# Sphero Hot & Cold HRI Study

This project explores **how a non-anthropomorphic robot (Sphero)** can communicate help to a human in a **Hot & Cold object search game**, using only:

- **Chromatical cues** (LED colors),
- **Kinesic cues** (movement patterns), or
- **Multi-modal cues** (both together).

We’re interested in how these different communication modalities affect:

- **Task performance** (time to find the object, errors, confusion), and  
- **Social perception & interpretability** (does the robot feel intelligent, clear, likable, “close”?).

The project is part of a **Social Robotics & Human–Robot Interaction** course.

---

## Experimental Conditions

We use a **between-subjects design** with 3 groups:

1. **Light Only (Chromatic)**  
   - Sphero behaves like a “backpack” (heeling behind/next to the user).  
   - Only the **LED color and blinking pattern** encodes hot/cold:  
     - Blue = cold (far)  
     - Orange = warm (getting closer)  
     - Red = hot (very close)  
     - Green/Rainbow = found  

2. **Movement Only (Kinesic)**  
   - LED stays neutral/dim.  
   - Only **movement patterns** encode hot/cold:  
     - Sluggish wobble = cold  
     - Energetic spin = warm  
     - Intense shaking = hot  
     - Happy dance (little square/figure-eight) = found  

3. **Multi-Modal (Light + Movement)**  
   - Colors and movement combined (e.g. blue + sluggish, red + intense shake).

A human “Wizard” controls Sphero according to a fixed protocol while a participant searches for a hidden object in the room.

---

## Repo Structure

```text
sphero-hotcold-hri/
├─ code/
│  └─ sphero_behaviors.js   # Sphero Edu JavaScript behaviors (light, movement, multi)
├─ data/                    # (to be used later) logs, results, spreadsheets
├─ docs/                    # design notes, experiment plan, PDFs
└─ report/                  # paper/report drafts, figures
