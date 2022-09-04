library(ggplot2)
library(jsonlite)
data <- fromJSON("D:\\Code Library\\foody_servey\\result--top500.json")
tmp <- data.frame(y = data$key, x = data$value)
tmp
p <- ggplot(data=tmp, aes(x=y, y=x)) +
  labs(x="District", y="Number of Shop", title="Number of Cafe Shop") +
  geom_bar(stat="identity") + theme_bw()

p