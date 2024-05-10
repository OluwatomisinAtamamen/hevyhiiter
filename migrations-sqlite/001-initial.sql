--Up

-- profile table
CREATE TABLE PROFILE(
PROFILE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
USERNAME VARCHAR(35) NOT NULL
);

-- workout table
CREATE TABLE WORKOUT(
WORKOUT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
WORKOUT_NAME VARCHAR(50) NOT NULL,
DESCRIPTION TEXT NOT NULL,
WORKOUT_DURATION INTEGER NOT NULL,
DATE_CREATED DATE DEFAULT CURRENT_DATE,
PROFILE_ID INTEGER NOT NULL REFERENCES PROFILE(PROFILE_ID)
);

-- exercise table
CREATE TABLE EXERCISE(
EXERCISE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
EXERCISE_NAME VARCHAR(50) NOT NULL,
DESCRIPTION TEXT NOT NULL,
EQUIPMENT VARCHAR(20)
);

-- muscle_group table
CREATE TABLE MUSCLE_GROUP(
MUSCLE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
MUSCLE_NAME VARCHAR(50) NOT NULL
);

-- workout_exercise table
CREATE TABLE WORKOUT_EXERCISE(
WORKOUT_EXERCISE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
WORKOUT_ID INTEGER NOT NULL,
EXERCISE_ID INTEGER NOT NULL,
EXERCISE_DURATION INTEGER NOT NULL,
REST_DURATION INTEGER NOT NULL,
FOREIGN KEY (WORKOUT_ID) REFERENCES WORKOUT(WORKOUT_ID),
FOREIGN KEY (EXERCISE_ID) REFERENCES EXERCISE(EXERCISE_ID)
);

-- exercise_muscle table
CREATE TABLE EXERCISE_MUSCLE(
EXERCISE_ID INTEGER NOT NULL,
MUSCLE_ID INTEGER NOT NULL,
PRIMARY KEY (EXERCISE_ID, MUSCLE_ID),
FOREIGN KEY (EXERCISE_ID) REFERENCES EXERCISE(EXERCISE_ID),
FOREIGN KEY (MUSCLE_ID) REFERENCES MUSCLE_GROUP(MUSCLE_ID)
);

INSERT INTO MUSCLE_GROUP (MUSCLE_NAME) VALUES 
('Legs'),
('Shoulders'),
('Biceps'),
('Abs(Core)'),
('Cardio'),
('Back'),
('Glutes(Butt)'),
('Chest'),
('Triceps');

INSERT INTO PROFILE (USERNAME) VALUES
('Tomi'),
('John');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Incline Push Ups', null, 'Begin in the pushup position with your hands elevated on any stable surface higher than the floor.
Keep your body in a straight line from your shoulders to your toes and keep your abs and butt engaged.
Lower yourself to the floor by bending your elbows until your chest almost hit the surface.
Drive through the palms of your hands to push yourself back up until your arms are locked out.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Hammer Curls', 'Dumbbells', 'Stand with a dumbbell each hand and your palms facing your body.
Curl your hands up to your shoulders keeping your elbows back and tight to your side.
Lower your hands back down to your sides.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Kettlebell Swings', 'Kettlebells', 'Stand with feet wider than shoulders, kettlebell in line with feet.
Squat and grip the kettlebell, then stand up straight.
Keep arms loose, bend knees slightly, and push hips back.
Swing the weight back between your legs, keeping your core tight and back straight.
Drive hips forward, lifting your torso and swinging the bell to chin height.
Contract your glutes, hamstrings, and abs at the peak of the swing, standing tall with a tucked pelvis.
Reverse the movement by pushing hips back and swinging the bell back between your legs.
Repeat the swing from the starting position.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Goblet Squats', 'Dumbbells', 'Stand with your feet a little bit wider than your shoulders and hold a dumbbell close to your chest.
Squat down to at least parallel while keeping the knees in line with the ankles.
Push through your feet back up to a standing position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Shoulder Press', 'Dumbbells', 'Stand with your feet hip width apart while holding weights in your hands at the top of your shoulders.
Drive your hands up above your head and lock out your arms.
Lower your hands back to the top of your shoulders.
repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Bicep Curls', 'Dumbbells', 'Stand with a dumbbell each hand and your palms facing forward.
Curl your hands up to your shoulders keeping your elbows back and tight to your side.
Lower your hands back down to your sides.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Step Ups With Weight', 'Dumbbells', 'Step onto bench alternating feet, holding dumbbells at sides. Keep back straight, core engaged. Lift right foot, step up, bringing left foot up beside it. Step down with left foot, then right. Repeat, alternating legs. Inhale up, exhale down. Maintain form, use appropriate weight. Ensure safety.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Front Delt Raises', 'Dumbbells', 'Stand with your feet hip width apart and hold the weight in front of your thighs with your palms facing you.
Raise your hands forward and upward to shoulder height keeping a straight line from your shoulders to your wrists.
Lower your hands back down to the starting position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Decline Push Ups', null, 'Begin in the pushup position with your feet elevated on any stable surface higher than the floor.
Keep your body in a straight line from your shoulders to your toes and keep your abs and butt engaged.
Lower yourself to the floor by bending your elbows until your chest almost touches the floor.
Drive through the palms of your hands to push yourself back up until your arms are locked out.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Underhand Bent Rows', 'Dumbbells', 'Stand with your feet hip width apart holding your weights at your side, your palms facing your front.
Bend over from the hips with a slight bend in the knees while keeping your head up allow the weight to hang from your arms.
Pull the weight towards your hips while holding it in an underhand position.
Lower your arms back to the hanging position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Overhand Bent Rows', 'Dumbbells', 'Stand with your feet hip width apart holding your weights at your side, your palms facing your back.
Bend over from the hips with a slight bend in the knees while keeping your head up allow the weight to hang from your arms.
Pull the weight towards your hips while holding it in an overhand position.
Lower your arms back to the hanging position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Feet Elevated Tricep Dips', null, 'Sit on the edge of a bench with your hands just outside of your hips, fingers forward.
Rest your feet on another chair in front of you, keeping your legs straight.
Bend your elbows as far as you can go down preferably around 90 degrees, lowering your hips towards the floor, keeping them parallel to the chair.
Press body up by extending your elbows.
Repeat from step 3.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Good Mornings', 'Dumbbells', 'Stand with your knees slightly bent and your feet shoulder width apart positioning your weight in front of you.
Bend at the waist, while keeping your head up, and lean forward until your upper body is about parallel to the ground.
Bring yourself back up to the standing position by squeezing your butt and hamstrings.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Jump Rope', 'Jump Rope', 'Swing the rope over your head.
Keep your feet together as you jump over the rope.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Renegade Rows', 'Dumbbells', 'Get into the top of your push up position while holding on to dumbbells.
Lift your right arm, bringing the weight off the ground and up to your chest.
Lower the weight and return the starting position.
Alternate and repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Handstand Push Ups', null, 'Face a wall in a standing position.
Bend down and place your palms on the floor and kick your feet up so you’re in a handstand position against a wall.
Keep your abs, glutes and thigh muscles tight.
Lower yourself toward the ground as far as possible.
Press through your hands back up until your arms are locked out.
Repeat.
It is important to note that you must not forget to breathe while doing this exercise; Not breathing can lead to popped blood vessels in your face and you may pass out.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Stationary Sprints', null, 'Begin in the standing position.
Raise and lower one knee at a time as if running in place.
Alternate legs and go as fast as you can.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Standing Alternating Side Crunch', null, 'Stand with feet hip-width apart, hands behind head. Lift right knee to side, crunching torso towards it. Return to starting position. Repeat on left side. Keep core engaged, exhale on crunch, inhale return. Maintain balance and form.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Alternating Jump Lunges', null, 'Get into a lunge position with your right foot forward and your left foot back, knees at a 90 degree angle.
Jump up and alternate legs landing in a lunge position so your left foot is forward and your right foot is back.
Be sure to keep your forward knee in line with your ankle.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Lateral Plank Tucks', null, 'Begin in the plank position, keep your feet together and bring your feet to your right elbow, slightly twisting your hips.
Return to the starting plank position.
Keep your feet together and bring your feet to your left elbow, slightly twisting your hip, then return to the starting plank position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Burpees', null, 'Drop to floor into a plank position from the standing position.
Thrust your your knees toward your chest into a low squat position.
Jump as high as you can from the low squat position.
Land in the standing position with your knees slightly bent.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Leg Lifts', null, 'Lie on the floor face up, feet together.
Keep your legs together and lift them off the ground by contracting your abs.
Return towards the starting position but do not allow your feet to rest on the ground.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Tricep Dips', null, 'Sit on the edge of a chair with your hands just outside of your hips, fingers forward.
Rest your heels in front of you, keeping your legs straight.
Bend your elbows as far as you can go down preferably around 90 degrees, lowering your hips towards the floor, keeping them parallel to the chair.
Press body up by extending your elbows.
Repeat from step 3.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Planks', null, 'Get in the plank position, resting on forearms with your elbows in line with your shoulders, body aligned from head to heels.
Keep your hips up and hold this position contracting the abs.
Hold for time.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Butt Lift Bridge', null, 'Lie flat on your back with your hands by your sides and your knees bent so your feet are flat on the ground about hip width apart.
Pushing through your heels, lift your hips off the floor while keeping your back straight; Breathe out as you perform this part of the motion and hold at the top for a second creating a bridge from your knees to your shoulders.
Slowly bring your butt back down to the floor to complete the rep.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Tuck Jumps', null, 'Jump straight up from the standing position.
Bring your knees to towards your chest at the peak of your jump.
Land in the standing position and immediately repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Toe Touches', null, 'Lie on the floor face up with your feet together and your legs lifted off the ground to make an L shape.
Reach up and touch your toes.
Return toward the starting position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Pike Push Ups', null, 'Get into the pike position.
Lower your head towards the floor by bending your elbows.
Push through your hands and return to the starting pike position.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Bicycle Crunches', null, 'Lie on your back with your legs extended.
Lift your right leg towards your chest and simultaneously lift your torso.
Rotate your torso so your left elbow touches your right knee.
Return to the starting position.
Alternate and repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Russian Twists', null, 'Sit with your feet hip-width apart, flat on the floor and clasp your hands out in front of your chest.
Lift your feet slightly off the floor, balancing on the base of your spine.
Twist to the right without dropping your feet then return to center.
Twist to the left and return to center.
Repeat without dropping your feet.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Feet Elevated Pike Push Ups', null, 'Get into the pike position with your feet elevated on a chair or bench
Lower your head towards the floor by bending your elbows
Push through your hands and return to the starting pike position
Repeat');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Lateral Plank', null, 'Get in the plank position where your right forearm rests on the ground with your elbow in line with your shoulder, body aligned from head to heels with your left foot stacked on your right; Your left hand rests on your body.
Keep your hips up and hold this position contracting the abs.
Hold for time, then switch sides.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Squats With Weight', 'Dumbbells', 'Squat with dumbbells at sides. Feet shoulder-width apart, toes slightly turned out. Lower into squat, keeping back straight, chest up. Knees in line with toes. Push through heels, return to standing. Inhale down, exhale up. Maintain form, use appropriate weight. Ensure safety.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('1/4 Squat Jumps', null, 'Stand with your feet shoulder with apart.
Squat down a ¼ of your normal range.
Jump up as high as you can.
Land safely.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Supermans', null, 'Lie on the ground face down with your hands extended in front of you.
Squeeze the lower back raising your hands and feet off the floor.
Lower your arms and legs back down to the floor.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Scissor Kicks', null, 'Lie on the floor face up, feet together.
Keep your legs together and lift them off the ground 6 inches by contracting your abs.
Create a scissor like motion by simultaneously raising one leg and lowering the other; Do not let lower leg touch the ground.
Repeat step 3 until time is up.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Mountain Climbers', null, 'Begin in the plank position with your right knee by your chest and your left leg extended.
Switch your bent leg and straight leg simultaneously as if you were running.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Seal Slides', null, 'Lie on the ground face down with your hands down at your sides.
Squeeze the lower back raising your hands and feet off the ground while squeezing your shoulder blades back and down your spine.
Lower your arms and legs back down.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Knee to Elbow Planks', null, 'Start in the plank position with your wrists under shoulders and body aligned from head to heels.
Drive your right knee toward the outside of your right elbow by lifting your leg and bending your knee.
Return to the beginning position.
Alternate and Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('High Knees', null, 'Begin in the standing position.
Raise and lower one knee at a time as if running in place.
Bring the knees to the same height as the hips and keep your thighs parallel to the ground.
Alternate legs and go as fast as you can.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Incline Push Ups', null, 'Begin in the pushup position with your hands elevated on any stable surface higher than the floor.
Keep your body in a straight line from your shoulders to your toes and keep your abs and butt engaged.
Lower yourself to the floor by bending your elbows until your chest almost hit the surface.
Drive through the palms of your hands to push yourself back up until your arms are locked out.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Plank Tucks', null, 'Begin in the plank position, keep your feet together and bring your feet under your chest.
Extend your feet back to the starting plank position; Try to keep you back and butt level as much as possible.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Full Extension Crunches', 'Swiss ball', 'Sit on the edge of a swiss ball so that your feet are flat on the floor and the swiss ball is at the base of your back
Extend yourself backwards over the swiss ball and lower yourself towards the ground holding for a two count when abs are fully extended
Contract your abs and raise back up to the starting position
Repeat');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Bird Dogs', null, 'Get on all fours keeping your back straight with your knees directly under your hips and your hands directly under your shoulders.
Lift your right arm and it extended it out in front of you simultaneously lift your left leg and extend it behind you.
Hold for a 2 count and return to the starting position.
Alternate and Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Squats', null, 'Stand with your feet a little wider than hip-width apart, your toes turned out slightly and your arms resting at your sides.
Bend your knees slowly, pushing your butt and hips out and down behind you as if you are sitting down into a chair. Keep your head and back straight and your knees aligned over your ankles. Keep your weight balanced evenly between the front and back of your feet.
Lower your body until your thighs are parallel to the ground. Don’t let your knees fall inward. As you lower down, bring your arms up and in front of your chest.
Push through your feet and straighten your legs to come up while lowering your arms back to your side.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Alternating Lunges', null, 'Stand with your feet approximately hip width apart, hands on your hips, and pick a point to stare at in front of you to help maintain balance.
Step forward with one leg, keeping your back straight, lowering your hips until both knees are bent at a 90-degree angle.
Make sure your front knee is directly above your ankle, and not going past your toe and make sure your back knee does not touch the floor.
Push through your front heel to get back to the starting position.
Alternate legs and repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Wide Mountain Climbers', null, 'Start in the plank position with your wrists under shoulders and body aligned from head to heels.
Drive your right knee toward the outside of your right elbow by lifting your leg and bending your knee.
Return to the beginning position.
Alternate and Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Tricep Push Ups', null, 'Start in the push up position and place your hands closer than shoulder-width apart, touching your index fingers and thumbs together making a diamond shape with your hands.
Bend your elbows to lower down until you almost touch the floor with your chest.
Lift back up by pushing through your elbows and palms.
Keep your torso in a straight line throughout the move.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Push Ups', null, 'Place your hands slightly wider than shoulder-width apart and place your toes on the floor while face down.
Keep your body in a straight line from your shoulders to your feet and keep your abs and butt engaged.
Lower yourself by bending your elbows until your chest almost touches the floor.
Drive through the palms of your hands to push yourself back up until your arms are locked out.
Repeat.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Step Ups', null, 'Stand in front a of bench or another very stable, sturdy surface.
Place your right foot on the bench and lift yourself up by pushing through your foot while keeping your knee behind your toes.
Bring the left down to the ground and return to the starting position.
Repeat and alternate legs.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('V-Holds', null, 'Lie face up on the floor, feet together.
Raise your torso and and legs together so that your body makes a V.
Hold this position for time.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Jumping Jacks', null, 'Start standing with feet together, arms at sides. Jump feet out to sides while raising arms overhead. Return to starting position by jumping feet back together and lowering arms. Repeat in a continuous motion. Maintain steady pace, engage core. Breathe naturally. Perform with proper form, avoiding locking knees or elbows. Adjust intensity as needed.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Butt Kicks', null, 'tand tall, feet hip-width apart. Engage core for stability. Bend right knee, bringing right heel towards glutes. Quickly switch, bringing left heel towards glutes. Alternate legs in a running motion, kicking heels towards glutes. Pump arms for momentum. Breathe naturally. Focus on speed and rhythm. Repeat for desired duration. Maintain good posture throughout.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Jump Squats', null, 'Start with feet shoulder-width apart, squat down, then explode up into a jump. Land softly, immediately lowering into the next squat. Keep chest up, back straight. Engage core, land with knees bent. Repeat without pausing. Inhale down, exhale up. Use explosive power, maintain control. Ensure proper form, consider impact on joints.');

INSERT INTO EXERCISE (EXERCISE_NAME, EQUIPMENT, DESCRIPTION) VALUES ('Plank Jacks', null, 'Start in a plank position, hands shoulder-width apart, core engaged. Jump both feet out to the sides simultaneously, then jump them back together. Keep hips stable, core tight. Repeat the jumping motion while maintaining plank position. Breathe steadily. Avoid arching or sagging back. Maintain control and rhythm throughout.');


INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Squats',
    'Alternating Lunges',
    'Step Ups',
    'Jumping Jacks',
    'Butt Kicks',
    'Jump Squats',
    'High Knees',
    'Mountain Climbers',
    'Scissor Kicks',
    '1/4 Squat Jumps',
    'Squats With Weight',
    'Lateral Plank',
    'Seal Slides',
    'Tuck Jumps',
    'Leg Lifts',
    'Burpees',
    'Alternating Jump Lunges',
    'Stationary Sprints',
    'Good Mornings',
    'Kettlebell Swings',
    'Goblet Squats',
    'Step Ups With Weight'
)
AND MUSCLE_NAME = 'Legs';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Handstand Push Ups',
    'Lateral Plank Tucks',
    'Burpees',
    'Pike Push Ups',
    'Seal Slides',
    'Feet Elevated Pike Push Ups',
    'Laternal Plank',
    'Squat With Weight',
    'Supermans',
    'Mountain Climbers',
    'Incline Push Ups',
    'Tricep Push Ups',
    'Push Ups',
    'Jumping Jacks',
    'Incline Push Ups',
    'Kettlebell Swings',
    'Shoulder Press',
    'Front Delt Raises'
)
AND MUSCLE_NAME = 'Shoulders';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Burpees',
    'Hammer Curls',
    'Bicep Curls',
    'Underhand Bent Rows',
    'Overhand Bent Rows'
)
AND MUSCLE_NAME = 'Biceps';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Kettlebell Swings',
    'Burpees',
    'Leg Lifts',
    'Planks',
    'Toe Touches',
    'Pike Push Ups',
    'Bicycle Crunches',
    'Russian Twists',
    'Seal Slides',
    'Feet Elevated Pike Push Ups',
    'Lateral Plank',
    'Squats With Weight',
    'Supermans',
    'Scissor Kicks',
    'Mountain Climbers',
    'Knee to Elbow Planks',
    'Plank Tucks',
    'Full Extension Crunches',
    'Bird Dogs',
    'Squats',
    'Wide Mountain Climbers',
    'Tricep Push Ups',
    'V-Holds',
    'Plank Jacks',
    'Handstand Push Ups',
    'Standing Alternating Side Crunch',
    'Lateran Plank Tucks',
    'Push Ups'
)
AND MUSCLE_NAME = 'Abs(Core)';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
   'Incline Push Ups',
   'Shoulder Press',
   'Decline Push Ups',
   'Feed Elevated Tricep Dips',
   'Handstand Push Ups',
   'Burpees',
   'Tricep Dips',
   'Picke Push Ups',
   'Feet Elevated Pike Push Ups',
   'Tricep Push Ups',
   'Push Ups'
)
AND MUSCLE_NAME = 'Triceps';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Jump Rope',
    'Stationary Sprints',
    'Lateral Plank Tucks',
    'Burpees',
    'Tuck Jumps',
    '1/4 Squat Jumps',
    'Mountain Climbers',
    'High Knees',
    'Alternating Lunges',
    'Wide Mountain Climbers',
    'Step Ups',
    'Jumping Jacks',
    'Butt Kicks',
    'Jump Squats',
    'Plank Jacks'
)
AND MUSCLE_NAME = 'Cardio';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
   'Burpees',
   'Kettlebell Swings',
   'Underhand Bent Rows',
   'Overhand Bent Rows',
   'Renegade Rows',
   'Supermans',
   'Bird Dogs',
   'Push Ups'
)
AND MUSCLE_NAME = 'Back';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Burpees',
    'Kettlebell Swings',
    'Goblet Squats',
    'Step Ups With Weight',
    'Good Mornings',
    'Butt Lift Bridge',
    'Seat Slides',
    'Lateral Plank',
    'Supermans',
    'Bird Dogs',
    'Squats',
    'Alternating Lunges',
    'Step Ups',
    'Butt Kicks',
    'Jump Squats'
)
AND MUSCLE_NAME = 'Glutes(Butt)';

INSERT INTO EXERCISE_MUSCLE (EXERCISE_ID, MUSCLE_ID)
SELECT EXERCISE_ID, MUSCLE_ID
FROM EXERCISE, MUSCLE_GROUP
WHERE EXERCISE_NAME IN (
    'Incline Push Ups',
    'Decline Push Ups',
    'Burpees',
    'Picke Push Ups',
    'Feet Elevated Pike Push Ups',
    'Incline Push Ups',
    'Tricep Push Ups',
    'Push Ups'
)
AND MUSCLE_NAME = 'Chest';
