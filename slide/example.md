### Relative path image

![](mem1.jpg)

----

### Absolute path image

![](https://avatars.steamstatic.com/2a063b4fa21e61830c25e681472f8e2339af1d3a_full.jpg)

---

### Relative path link

[Relative link](mem1.jpg)

----

###  Absolute path link

[Absolute link](https://avatars.steamstatic.com/2a063b4fa21e61830c25e681472f8e2339af1d3a_full.jpg)

---

###  Code

```javascript
const makeUrl = (urlString) => {
    if (urlString.indexOf('http://') === 0 
        || urlString.indexOf('https://') === 0)
        return urlString
    else
        return url + urlString
}
```
