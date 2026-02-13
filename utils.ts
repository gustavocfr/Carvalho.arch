/**
 * UTILITY: SMART FOLDER PATH GENERATOR
 * 
 * Logic: assets/img/projects/{CODE}/{NUMBER}.jpg
 * 
 * NOTE: For this demo environment, we are falling back to Unsplash/Picsum 
 * if local assets are not found, but the logic below is exactly as requested.
 */

export const getProjectImage = (code: string, number: number): string => {
  // 1. SPECIFIC PROJECT MAPPING (Manually added for Demo)
  if (code === 'MARINA') {
    const marinaImages = [
      '', // index 0 padding
      // 1. Cover (Requested)
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/572099862_17923912902155058_2449754569534349442_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=Mzc1NDkwMjk1OTg0Mzg2MTM4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzIifQ%3D%3D&_nc_ohc=UIhKEfiMSQ4Q7kNvwGGudl0&_nc_oc=AdlVGjeJ73s73xmUs-U_QIacUbERz4cWWQKDASRZ07gYzGEiI5LoNMtfJRVE-h0RXuaELZMxZJGilhLIMEiVLIXN&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=C1N10sSQaykUWmoTDk3MwA&oh=00_AfvPCXrJW3llnlALQDB0wo9RmesEVG19SnjRkBYYSHlAmQ&oe=6994943C',
      // 2.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/571373312_17923912929155058_3192648691393663987_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=101&ig_cache_key=Mzc1NDkwMjk1OTg1MjI2ODk3NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzIifQ%3D%3D&_nc_ohc=kzl5-ukhWAIQ7kNvwFe9eM9&_nc_oc=AdndS-Mbkak4lFcKM-QdrUOCIsqr4Nmqu5cmJJTeahjkmYPh-4CyAk9GeTib9kFqmVjcNxzAIhkJBXtkhUe-SuY2&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=C1N10sSQaykUWmoTDk3MwA&oh=00_AfuEhif5rS_ZbHnJFU17iVVV-b5vlcBZ9vTk8eW0rUVPFQ&oe=69948A6A',
      // 3.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/571492190_17923912920155058_1339043597426515906_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=106&ig_cache_key=Mzc1NDkwMjk1OTg1MjI1MDU1Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzIifQ%3D%3D&_nc_ohc=J08Op-rcGC4Q7kNvwFt0AbC&_nc_oc=AdkrJl7X8YkPNy9jzHqVKfRdFjVba9pUWgKnpPe_RGUm4sl7SYUO_fIDZvoMpIC0HlN9FMg13S-xVyAKFK4tPtVb&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=C1N10sSQaykUWmoTDk3MwA&oh=00_AfvkN1YFRnUSt5C079ct6N3rEpcPuh0NocCFI014VhwHbw&oe=69949096',
      // 4.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/571936112_17923912911155058_1987993781360026154_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=101&ig_cache_key=Mzc1NDkwMjk1OTg1MjIyNTM4OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzIifQ%3D%3D&_nc_ohc=hincOcQxfeAQ7kNvwGHpPQM&_nc_oc=Admd4PdsUBls-WaDG1mYzuu7-r8fCKi8vSEe51QGZua_y1fS2Zm9FQpQJj4O6awKwuOnOKXVaJpx5RsGxajgEm_M&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=C1N10sSQaykUWmoTDk3MwA&oh=00_Afvp9eeHloMHtEACL47U0VP3L3xP2Tl90ZPhtrpDq6UX5g&oe=6994A29F'
    ];
    return marinaImages[number] || marinaImages[1];
  }

  if (code === 'WANDERSON') {
    const wandersonImages = [
      '',
      // 1. Cover (Requested as top image)
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/556965197_17946152067025886_4954787447149779506_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzczMzIxOTg2MDY0Mjk1MDcxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc3Mi5zZHIuQzIifQ%3D%3D&_nc_ohc=rH33JqyIoq0Q7kNvwHv6Z3E&_nc_oc=AdkTv_sXbd7vi1UJQhyFu_0WkWIL-negZSaKNehKgXn_1AxqEeFectSb6ly6Ltv8Is-li2GbwJ3FUR565oGL1JwV&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfsGjp7vnLfEyna1QVopIQAh_Lm86oDfZmdNU_mCk19Bzg&oe=6994A283',
      // 2
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/558065439_17946152079025886_937604974847221985_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=107&ig_cache_key=MzczMzIxOTg2MDYyNjE0OTU3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc2My5zZHIuQzIifQ%3D%3D&_nc_ohc=SK_cIocxBMEQ7kNvwGArYHT&_nc_oc=Adlis8_77NQvhdnI1VRbGfoyWNrzL5S4rHQ7EnFKroThxh0XYdOZzztDe3xdKLlBfdC68efEi1BnJTq_0JRz5J40&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AftLgA5dgBAskE9Ms8vi_VXyH7CNI7HImcijII7kRsoZvg&oe=69948FCC',
      // 3
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/556847113_17946152100025886_3299992493048996936_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=111&ig_cache_key=MzczMzIxOTg2MDQ5MTk1MDQwOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc2My5zZHIuQzIifQ%3D%3D&_nc_ohc=vkyEdTGsFuoQ7kNvwFZCboT&_nc_oc=Adlf0iwejitdIolKpSGCqW3pYglzJyX7sj4CwX4hLBiLBUzUsPyrVmMrJPVVBS57_ldH61yxXRcoFfFt0ccGHiuA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_Afsyv3g1xrZ_zQZ85cxSSqYeRAYUL94YYVouSbCP12tpwQ&oe=69948C3E',
      // 4
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/558226304_17946152118025886_855457357537255824_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=MzczMzIxOTg2MDY2ODEyNjM3OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc3Mi5zZHIuQzIifQ%3D%3D&_nc_ohc=KgMTbsNEDv4Q7kNvwGIwW6u&_nc_oc=AdlbGmqj3d8CbXC7bi9gmaCaCpqf-PZpD1jtSBmNo8CZW1lJZH8rq1SkPxIvr_GP4-oloN6aR1gLeFeYZsXDweIP&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AftULDJyAEgdTZu9w35UKk_m6wIw5U4ZKAurdpWi7VDLnA&oe=69949936',
      // 5
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/540756594_17943017211025886_4553951740702513742_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzcxNDIzMDM0OTQ2MDMwMjE5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzIifQ%3D%3D&_nc_ohc=ZjMPt3JB5EgQ7kNvwHdU17g&_nc_oc=AdmgTrtkldUwrQaWmKKsoG3-8bvaQzcSLNI5bvuzVHI5wk5zOxgttlMc9JR1X4HrkPhdEyggYm-r7qWJQHD8Yz_I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfsB0SQ9Cdf-KQbhR3ODnggG5eKjy_7cNtmGrjTDZ-WXnA&oe=6994A53F',
      // 6
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/557252141_17946152130025886_2792175211601109324_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=MzczMzIxOTg2MDQ3NTE1ODE3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc3Mi5zZHIuQzIifQ%3D%3D&_nc_ohc=VepmiEhJTCAQ7kNvwFTQPGh&_nc_oc=AdmwcaJmX9Ay0pT4EkyaZUMksSeFMeqdQ3oxgtUZFX5iX3xc6_JFzRAgcP6HXhwpE9BEqvzRmxGx7H8x19O0Razn&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfvbWF2ahjIpt-hzEhi6O1nMBPI1elaN1V0ME4IE1_uyyQ&oe=6994B5AC',
      // 7
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/540699879_17943017184025886_1418851009482758664_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzcxNDIzMDM0OTQ2ODY2NjY2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzIifQ%3D%3D&_nc_ohc=AispTiqsKjAQ7kNvwH0o92x&_nc_oc=AdnpyAVC52whX1bgnLvRr6-wZEZ3D_7bD9p8AliJiTeNIFeOn4wSvzkYT4FW4Ohr8crcjwbFGi0woNguL0HgYskv&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_Afvk_-982XTVpNSXC-EIFjmqRnJaS8vcQMVpSBE3B6qg5A&oe=699486F3'
    ];
    return wandersonImages[number] || wandersonImages[1];
  }

  if (code === 'LETICIA') {
    const images = [
      '',
      // 1. Cover
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/625750543_17958746814025886_8775227728964560903_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzgyMzA4MTA1Nzc4MDk0NjIxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTcwOC5zZHIuQzIifQ%3D%3D&_nc_ohc=habBaLyS5tcQ7kNvwFJKYbM&_nc_oc=Adla2VCKojuHO-IqrsWCIuLzxhfX5VRlCmlJWtY6s6kkojHteyItF-fcSh_2OMRcBylLsvSB4s5oTHmSTSD8xEbY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_Afs3DLAHRwxuNjGhqGM34tOsXAnAIaeiI3t0E0RKN7DLCg&oe=6994BB1B',
      // 2.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/626231544_17958746775025886_5985954870512621009_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzgyMzA4MDkxMDE0OTgyMzU0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTcwOC5zZHIuQzIifQ%3D%3D&_nc_ohc=9lejBMoMM5wQ7kNvwF7V8cK&_nc_oc=AdkcFERzwcC9ZN0rRg7ODd-nQK-eNCm5AMvLvwcQG6KXQxQQ5bn3PTkmSCZbCgcF9UzjE8q201Pz0n-j8EblK2Ik&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfvCqXg1vyyIP6AJlnG-D40GMmKbYkQ6glqYV3p2gMJbjQ&oe=6994B4F4',
      // 3.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/624697262_17958746790025886_3943761534511857682_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzgyMzA4MDk0MTA3MDI1MzA3OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTcwOC5zZHIuQzIifQ%3D%3D&_nc_ohc=ee9Tr0kygMUQ7kNvwHy28Ru&_nc_oc=AdnkHkwWlGIWafwPbUJZKvVHeITSKIcKoFizu7R19c_IN0EqRI0Vb_YhxFqw23TuSbz-i_RG85vhMJX_SJwBY_cb&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfsfIloYcREXzHDINWVueX9xr4uTLvE2-tDxiOZSFzywug&oe=6994BBD0',
      // 4.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/624944496_17958746802025886_4452371023975593879_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=110&ig_cache_key=MzgyMzA4MTAwNDMyMDM0MTQyMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTcwOC5zZHIuQzIifQ%3D%3D&_nc_ohc=jT9G7FHbvswQ7kNvwEHGl3o&_nc_oc=AdltbbY4esSJ7Dw-CGY4C2GbQjhqC78XBd-Rttvi2SVtRxWoP1SCkk35amcBdRioKuXspGQ-L25SfQHJE2MAuage&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_Aft8Ug7eZgxzb4igaj5wpxq32YxpFLgW9STH2Dh6OgN4Og&oe=69948F67',
      // 5.
      'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.82787-15/626763831_17958746826025886_5647504303739883507_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=110&ig_cache_key=MzgyMzA4MTExNzc1OTUwMDI4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTcwOC5zZHIuQzIifQ%3D%3D&_nc_ohc=lboUV8zR0oYQ7kNvwHqnDB8&_nc_oc=AdmBIQLY25nQIhMvB-H3RvSmH142hCQffOZblsPkqpThNuvbY2NVLarkboefCYSufOnrllimanUFIPdlobO1DVnZ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_Aft9IDuIuNanwvEhjHrOhHUPAErJIWA9VKcgAJpSkXcTtg&oe=6994B1EB'
    ];
    return images[number] || images[1];
  }

  // Placeholder Logic for new projects until direct links are provided
  if (code === 'RECEPCAO') {
     const images = [
        '',
        'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.75761-15/497746180_17930816256025886_7866743403868422533_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzYzMzE4NTQ0ODM3MTA5MzkzMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzIifQ%3D%3D&_nc_ohc=9PUtVP2w1doQ7kNvwFWVQn6&_nc_oc=AdnMN3uyUabgpjNqorF5gBZpAM0H8C6pGxX7_vWogeezHfKnFQTisiL98sgV_4knd9mqrYLzqmrE83JwsdtQm-4s&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=Mj9Yt3QV8EaxVQxWLGBWfQ&oh=00_AfvHSMyFT_svlbUYPwI7X_LJtbe2BJoXaT01E6xLF2glig&oe=6994A477', // Cover
        'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.75761-15/497756589_17930816265025886_5593982417505381659_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzYzMzE4NTQ0ODM0NTgzNDk3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5OC5zZHIuQzIifQ%3D%3D&_nc_ohc=CsIUYyk_-pcQ7kNvwEq2H8-&_nc_oc=AdmXvmcqN1GkBU9YvPiAHRzIgMtx5gW5oI5jqX1qVTGApWGlSayPtsdIdRi8Z77Oe4CJBVyXBZctLfqqhA3pdO97&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=Mj9Yt3QV8EaxVQxWLGBWfQ&oh=00_Afv_kfN1GJ8KX6k4bBHuK-Epnnxd4PGrSjvjLLDBvRI3cw&oe=6994BA81',
        'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.75761-15/497671316_17930816283025886_2733602163036031868_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=107&ig_cache_key=MzYzMzE4NTQ0ODM1NDIxMzk1MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzIifQ%3D%3D&_nc_ohc=G9ULELtkUUMQ7kNvwFieAEA&_nc_oc=Adn5-9eafMS1rEazs9AarSPNIDja7UzozNVzJuXVY_uWK2rtKgcCa1PLlIMTPssM4spxSXNuQfadu_NQy6SQHj5n&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=Mj9Yt3QV8EaxVQxWLGBWfQ&oh=00_AftLJT7kBol0dibh1LBUOE7h6ZSC8ywRJKWY46epHpHX4w&oe=6994A9CB'
     ];
     return images[number] || images[1];
  }

  // 2. PRODUCTION MODE (Uncomment this line when you have the folders set up)
  // return `/assets/img/projects/${code}/${number}.jpg`;

  // 3. DEMO MODE (Using placeholders for visualization)
  // We use the code string to generate a somewhat consistent random seed
  const seed = code.charCodeAt(0) + number;
  return `https://picsum.photos/seed/${seed}/1200/1600`; 
};

export const getProfileImage = (): string => {
  return 'https://instagram.fipn7-1.fna.fbcdn.net/v/t51.75761-15/496831653_17930164932025886_6168698338634908562_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzYyOTAxMDM4Mzk4NzQ4ODc4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzIifQ%3D%3D&_nc_ohc=p2de-zaKZEwQ7kNvwEskNTe&_nc_oc=AdmJ9lCL8fSyrWqSmCpeersRmlZ34apQybJ1ROExQi0Wzs2EQm9QdhzvMzU42OuR0x222aiKBOqgMd42KSmZFAa-&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fipn7-1.fna&_nc_gid=baWCaMLNuKVSFHAhwW4Gxg&oh=00_AfsrI2YpT-XibGzyLeeOe60zMUXGrhGwqBgSgbq2a2bWcA&oe=6994959F';
}

/**
 * Adds non-breaking spaces after short words (1-3 chars) to prevent them 
 * from ending a line (orphans/widows) in justified text.
 */
export const formatTypographicText = (text: string): string => {
  if (!text) return '';
  // Regex: 
  // (\s|^) -> matches start of string or a space
  // ([\w\u00C0-\u00FF]{1,3}) -> matches 1-3 char words, including Portuguese accents
  // \s+ -> matches the following space
  // Replace with: $1$2\u00A0 (Non-breaking space)
  return text.replace(/(\s|^)([\w\u00C0-\u00FF]{1,3})\s+/g, '$1$2\u00A0');
};