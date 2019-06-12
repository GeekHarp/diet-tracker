// /food<form>
$('.ui.form')
  .form({
    fields: {
      calories: {
        identifier: 'calories',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter an integer value'
          }
        ]
      },
      desc: {
        identifier: 'desc',
        rules: [
        {
            type   : 'empty',
            prompt : 'Please enter description'
        }
        ]
      }
    }
  })
;

// /update<form>
$('.ui.form.two')
  .form({
    fields: {
      weight: {
        identifier: 'weight',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter a Integer'
          }
        ]
      },
      goal_weight: {
        identifier: 'goal_weight',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter a Integer'
          }
        ]
      }
    }
  })
;

// /newuser<form>
$('.ui.form.three')
  .form({
    fields: {
      gender: {
        identifier: 'gender',
        rules: [
          {
            type   : 'checked',
            prompt : 'Please select your Gender'
          }
        ]
      },
      activity_level: {
        identifier: 'activity_level',
        rules: [
          {
            type   : 'checked',
            prompt : 'Please select an Activity Level'
          }
        ]
      },
      diet_goal: {
        identifier: 'diet_goal',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a Diet Goal'
          }
        ]
      },
      weight: {
        identifier: 'weight',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter a Integer'
          }
        ]
      },
      goal_weight: {
        identifier: 'goal_weight',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter a Integer'
          }
        ]
      },
      goal_weight: {
        identifier: 'goal_weight',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please pick a Goal Date'
          }
        ]
      }
    }
  })
;