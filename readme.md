# ICT Class Website

This is a free-host friendly static website for ICT Class.

## Add Posters

1. Copy poster images into `assets/posters`.
2. Open `site-data.js`.
3. Add each poster inside the `posters` list.

Example:

```js
{ title: "ICT Class Admission", image: "assets/posters/poster-01.jpg", caption: "New student registration now open." }
```

## Add Student Paint Drawings

1. Copy drawing images into `assets/gallery`.
2. Open `site-data.js`.
3. Add each drawing inside the `gallery` list.

Example:

```js
{ title: "Paint Drawing", image: "assets/gallery/student-01.jpg", caption: "Grade 6 practical work" }
```

## Add Moving Classroom Background

1. Copy a wide photo of students using computers into `assets/hero`.
2. Open `site-data.js`.
3. Set `heroBackground`.

Example:

```js
heroBackground: "assets/hero/students-using-computers.jpg",
```

## Add Teacher Photos

1. Copy your photos into `assets/profile`.
2. Open `site-data.js`.
3. Add them inside `teacherPhotos`.

Example:

```js
teacherPhotos: [
  "assets/profile/photo-1.jpg",
  "assets/profile/photo-2.jpg",
  "assets/profile/photo-3.jpg"
],
```

## Add Student Game Video

1. Copy the game video into `assets/videos`.
2. Copy the student's photo into `assets/student-photos`.
3. Open `site-data.js`.
4. Update `gameProject`.

Example:

```js
gameProject: {
  title: "Car Racing Game",
  description: "A game created by a Grade 6 ICT student.",
  video: "assets/videos/game-demo.mp4",
  studentName: "Student Name",
  studentDetails: "Grade 6 ICT practical project",
  studentPhoto: "assets/student-photos/student-photo.jpg"
}
```

## Free Hosting Options

Netlify is the easiest first option. Upload this folder and choose a free site name such as `anshafict.netlify.app`.

Custom domains such as `anshaf.com`, `anshaf.lk`, or `anshaf.org` usually need to be purchased separately.
